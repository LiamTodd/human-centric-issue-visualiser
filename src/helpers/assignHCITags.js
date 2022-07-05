import { predict } from './mockMLTool';
import { addGitHubLabels } from './addGitHubLabels';
import { getGitHubIssueComments } from './getGitHubIssueComments';
import * as repoLabels from './labels';
import { removeGitHubLabel } from './removeGitHubLabel';

export const assignHCILabels = async (issue) => {
  // cleanup for testing purposes
  cleanUp(issue);
  // return [];

  // look through issue body and use ml tool to determine tags
  let HCILabels = predict(issue.body).categories;

  // look through each issue comment on use ml tool to determine tags
  const comments = await getGitHubIssueComments(issue.number);
  for (let i = 0; i < comments.data.length; i++) {
    const commentLabels = predict(comments.data[i].body);

    // update HCILabels
    for (let j = 0; j < commentLabels.length; j++) {
      if (commentLabels[j] == 1) {
        HCILabels[i] = commentLabels[j];
      }
    }
  }
  // use addGitHubLabels to add relevant labels to the issue
  const labelNames = [];
  if (HCILabels[0] == 1) {
    labelNames.push(repoLabels.appUsageLabel.name);
  }
  if (HCILabels[1] == 1) {
    labelNames.push(repoLabels.inclusivenessLabel.name);
  }
  if (HCILabels[2] == 1) {
    labelNames.push(repoLabels.userReactionLabel.name);
  } else {
    labelNames.push(repoLabels.noHCIIdentifiedLabel.name);
  }

  if (labelNames.length > 0) {
    addGitHubLabels(issue.number, labelNames);
  }

  return labelNames;
};

const cleanUp = (issue) => {
  // for mocking purposes
  // remove labels so double ups don't happen
  const labelNames = issue.labels.map((label) => {
    return label.name;
  });

  if (labelNames.includes(repoLabels.appUsageLabel.name)) {
    removeGitHubLabel(issue.number, repoLabels.appUsageLabel.name);
  }
  if (labelNames.includes(repoLabels.inclusivenessLabel.name)) {
    removeGitHubLabel(issue.number, repoLabels.inclusivenessLabel.name);
  }
  if (labelNames.includes(repoLabels.userReactionLabel.name)) {
    removeGitHubLabel(issue.number, repoLabels.userReactionLabel.name);
  }
  if (labelNames.includes(repoLabels.noHCIIdentifiedLabel.name)) {
    removeGitHubLabel(issue.number, repoLabels.noHCIIdentifiedLabel.name);
  }
};
