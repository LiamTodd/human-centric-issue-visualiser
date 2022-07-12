import { getGitHubIssues } from './getGitHubIssues';
import { getGitHubIssueComments } from './getGitHubIssueComments';
import { assignHCILabels } from './assignHCITags';
import * as repoLabels from './labels';

export const ISSUES_KEY = 'issues';
const statusLabels = [
  repoLabels.unresolvedHCILabel.name,
  repoLabels.resolvingHCILabel.name,
  repoLabels.resolvedHCILabel.name
];
const priorityLabels = [
  repoLabels.lowPriorityLabel.name,
  repoLabels.mediumPriorityLabel.name,
  repoLabels.highPriorityLabel.name
];

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
        console.log('assigning labels, ', issue.number);
        assignHCILabels(issue)
          .then((HCIs) => {
            issue.HCILabels = HCIs;
          })
          .then(() => {
            const labels = issue.labels.map((label) => {
              return label.name;
            });
            // uses the assumption that only one status label is applied to each issue
            let thisLabel = null;
            labels.forEach((label) => {
              if (statusLabels.includes(label)) {
                thisLabel = label;
              }
            });
            issue.progressTag = thisLabel;
          })
          .then(() => {
            const labels = issue.labels.map((label) => {
              return label.name;
            });
            // uses the assumption that only one priority label is applied to each issue
            let thisLabel = null;
            labels.forEach((label) => {
              if (priorityLabels.includes(label)) {
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
};
