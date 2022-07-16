import { predict } from './mockMLTool';
import { addGitHubLabels } from './addGitHubLabels';
import { getGitHubIssueComments } from './getGitHubIssueComments';
import * as repoLabels from './labels';
import { removeGitHubLabel } from './removeGitHubLabel';

export const assignHCITags = async (issue) => {
  // cleanup for testing purposes
  cleanUp(issue);
  // return [];

  // look through issue body and use ml tool to determine tags
  let HCILabels = predict(issue.body).categories;

  // look through each issue comment on use ml tool to determine tags
  // const comments = await getGitHubIssueComments(issue.number);
  const comments = issue.cached_comments;
  for (let i = 0; i < comments.length; i++) {
    const commentLabels = predict(comments[i].body).categories;
    const mappedCommentLabels = mapToLabels(commentLabels);
    comments[i].HCILabels = mappedCommentLabels;

    // update HCILabels by 'ORing' over first 3 elements of HCILabels and commentLabels
    // only iterate over first 3
    for (let j = 0; j < commentLabels.length - 1; j++) {
      if (commentLabels[j] == 1) {
        HCILabels[j] = commentLabels[j];
      }
    }
    console.log(HCILabels);
  }

  const labels = mapToLabels(HCILabels);
  // use addGitHubLabels to add relevant labels to the issue
  if (labels.length > 0) {
    addGitHubLabels(
      issue.number,
      labels.map((label) => {
        return label.name;
      })
    );
  }

  return labels;
};

const mapToLabels = (HCILabels) => {
  const labels = [];
  if (HCILabels[0] == 1) {
    labels.push(repoLabels.appUsageLabel);
  }
  if (HCILabels[1] == 1) {
    labels.push(repoLabels.inclusivenessLabel);
  }
  if (HCILabels[2] == 1) {
    labels.push(repoLabels.userReactionLabel);
  }
  if (HCILabels[3] == 1) {
    labels.push(repoLabels.noHCIIdentifiedLabel);
  }
  return labels;
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
