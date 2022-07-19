import { getGitHubIssues } from './getGitHubIssues';
import { getGitHubIssueComments } from './getGitHubIssueComments';
import { assignHCITags } from './assignHCITags';
import * as repoLabels from './labels';
import { ISSUES_KEY } from './localStorageKeys';

const statusLabels = [
  repoLabels.unresolvedHCILabel,
  repoLabels.resolvingHCILabel,
  repoLabels.resolvedHCILabel
];
const priorityLabels = [
  repoLabels.lowPriorityLabel,
  repoLabels.mediumPriorityLabel,
  repoLabels.highPriorityLabel
];
const nullLabel = { name: null, color: null };

export const setupLocalStorage = async () => {
  // get issues and comments
  const issues = (await getGitHubIssues()).data;
  issues.forEach((issue) => {
    getGitHubIssueComments(issue.number)
      .then((commentsResponse) => {
        // set comments
        issue.cached_comments = commentsResponse.data;
      })
      .then(() => {
        // get ML response
        assignHCITags(issue)
          .then((HCIs) => {
            issue.HCILabels = HCIs;
          })
          .then(() => {
            // set set status labels
            const labels = issue.labels;
            // uses the assumption that only one status label is applied to each issue
            let thisLabel = nullLabel;
            labels.forEach((label) => {
              if (
                statusLabels
                  .map((label) => {
                    return label.name;
                  })
                  .includes(label.name)
              ) {
                thisLabel = label;
              }
            });
            issue.progressTag = thisLabel;
          })
          .then(() => {
            // set priority labels
            const labels = issue.labels;
            // uses the assumption that only one priority label is applied to each issue
            let thisLabel = nullLabel;
            labels.forEach((label) => {
              if (
                priorityLabels
                  .map((label) => {
                    return label.name;
                  })
                  .includes(label.name)
              ) {
                thisLabel = label;
              }
            });
            issue.priority = thisLabel;
          })
          .then(() => {
            localStorage.setItem(ISSUES_KEY, JSON.stringify(issues));
          });
      });
  });
  return issues;
};
