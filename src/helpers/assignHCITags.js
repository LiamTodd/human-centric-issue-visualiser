import { predict } from './mlToolClient';
import { addGitHubLabels } from './addGitHubLabels';
import * as repoLabels from './labels';
import { removeGitHubLabel } from './removeGitHubLabel';

export const assignHCITags = async (issue) => {
  // cleanup for testing purposes: NEED TO CLEAN THIS
  const labels = cleanUp(issue).then(async () => {
    // create a list of comments and issue body
    let allComments = [];
    if (issue.body == null) {
      allComments.push('');
    } else {
      allComments.push(issue.body);
    }
    issue.cached_comments.forEach((comment) => {
      allComments.push(comment.body);
    });

    const res = await predict(allComments);
    // set body HCI labels
    let bodyHCILabels = mapToLabels(res[0]); // exclude comments
    issue.bodyHCILabels = bodyHCILabels;
    let accumulatedResult = res[0];
    if (res.length > 1) {
      const comments_1 = issue.cached_comments;
      for (let j = 1; j < res.length; j++) {
        // iterate over comments
        const mappedCommentLabels = mapToLabels(res[j]);
        comments_1[j - 1].HCILabels = mappedCommentLabels; // offset by 1 index as predictions includes body + comments

        // update HCILabels by 'ORing' over first 3 elements of HCILabels and commentLabels
        // only iterate over first 3
        for (let k = 0; k < res[j].length - 1; k++) {
          if (res[j][k] == 1) {
            accumulatedResult[k] = res[j][k];
            // if a label is identified, it means the 'no HCIs' tag must not be set
            accumulatedResult[accumulatedResult.length - 1] = 0;
          }
        }
      }
    }
    const labels = mapToLabels(accumulatedResult);
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

const cleanUp = async (issue) => {
  // remove labels so double ups don't happen

  let flag = []; // this is used to ensure .then works as expected in assignHCITags above
  flag += await removeGitHubLabel(
    issue.number,
    repoLabels.appUsageLabel.name
  ).catch(() => {});
  flag += await removeGitHubLabel(
    issue.number,
    repoLabels.inclusivenessLabel.name
  ).catch(() => {});
  flag += await removeGitHubLabel(
    issue.number,
    repoLabels.userReactionLabel.name
  ).catch(() => {});
  flag += await removeGitHubLabel(
    issue.number,
    repoLabels.noHCIIdentifiedLabel.name
  ).catch(() => {});
  return flag;
};
