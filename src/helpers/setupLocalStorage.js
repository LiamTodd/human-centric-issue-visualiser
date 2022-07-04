import { getGitHubIssues } from './getGitHubIssues';
import { getGitHubIssueComments } from './getGitHubIssueComments';
import { assignHCILabels } from './assignHCITags';

export const ISSUES_KEY = 'issues';

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
        assignHCILabels(issue)
          .then((HCIs) => {
            issue.HCILabels = HCIs;
          })
          .then(() => {
            localStorage.setItem(ISSUES_KEY, JSON.stringify(issues));
          });
      });
  });
};
