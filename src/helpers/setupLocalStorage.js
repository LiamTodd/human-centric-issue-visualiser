import { getGitHubIssues } from './getGitHubIssues';
import { getGitHubIssueComments } from './getGitHubIssueComments';
import { assignHCILabels } from './assignHCITags';

export const ISSUES_KEY = 'issues';
const statusLabels = ['Unresolved HCI', 'Resolving HCI', 'Resolved HCI'];

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
            localStorage.setItem(ISSUES_KEY, JSON.stringify(issues));
          });
      });
  });
};
