import { predict } from './mockMLTool';
import { addGitHubLabels } from './addGitHubLabels';
import * as repoLabels from './labels';
import { removeGitHubLabel } from './removeGitHubLabel';

export const assignHCITags = async (issue) => {
  // cleanup for testing purposes
  const res = cleanUp(issue).then(() => {
    // look through issue body and use ml tool to determine tags
    let result = predict(issue.body);
    issue.confidence = result.confidence;
    let HCILabels = result.categories;

    // set hci labels for body (exclude comments)
    const mappedBodyLabels = mapToLabels(HCILabels);
    issue.bodyHCILabels = mappedBodyLabels;

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
          // if a label is identified, it means the 'no HCIs' tag must not be set
          HCILabels[HCILabels.length - 1] = 0;
        }
      }
    }

    // console.log(HCILabels);

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
  });

  return res;
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

const cleanUp = async (issue) => {
  // remove labels so double ups don't happen

  let x = []; // this is used to ensure .then works as expected in assignHCITags above
  x += await removeGitHubLabel(issue.number, repoLabels.appUsageLabel.name);
  x += await removeGitHubLabel(
    issue.number,
    repoLabels.inclusivenessLabel.name
  );
  x += await removeGitHubLabel(issue.number, repoLabels.userReactionLabel.name);
  x += await removeGitHubLabel(
    issue.number,
    repoLabels.noHCIIdentifiedLabel.name
  );
  return x;
};
