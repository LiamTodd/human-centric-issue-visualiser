import { predict } from './mockMLTool';
import { addGitHubLabels } from './addGitHubLabels';
import { getGitHubIssueComments } from './getGitHubIssueComments';
import './labels';
import { appUsageLabel, inclusivenessLabel, userReactionLabel } from './labels';
import { removeGitHubLabel } from './removeGitHubLabel';

export const assignHCILabels = async (issue) => {
  // cleanup for testing purposes
  cleanUp(issue);

  // look through issue body and use ml tool to determine tags
  let HCILabels = predict(issue.body);

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
  const labels = [];
  if (HCILabels[0] == 1) {
    labels.push(appUsageLabel);
  }
  if (HCILabels[1] == 1) {
    labels.push(inclusivenessLabel);
  }
  if (HCILabels[2] == 1) {
    labels.push(userReactionLabel);
  }

  addGitHubLabels(issue.number, labels);
};

const cleanUp = (issue) => {
  // remove labels so double ups don't happen
  const labelNames = issue.labels.map((label) => {
    label.name;
  });

  if (labelNames.includes(appUsageLabel)) {
    removeGitHubLabel(issue.number, appUsageLabel);
  }
  if (labelNames.includes(inclusivenessLabel)) {
    removeGitHubLabel(issue.number, inclusivenessLabel);
  }
  if (labelNames.includes(userReactionLabel)) {
    removeGitHubLabel(issue.number, appUsageLabel);
  }
};
