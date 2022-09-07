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

export const setupLocalStorage2 = async () => {
  // get issues
  const issues = await getGitHubIssues();

  // for each issue:
  const processedIssuesPromise = new Promise((resolve) => {
    const processedIssues = issues.map((issue) => {
      // get comments
      getGitHubIssueComments(issue.number).then((comments) => {
        // set comments
        issue.cached_comments = comments;

        // get/set ML response
        issue.HCILabels = assignHCITags(issue);

        // set status label
        // uses the assumption that only one priority label is applied to each issue
        const labels = issue.labels;
        const thisStatusLabel = nullLabel;
        labels.forEach((label) => {
          if (statusLabels.map((label) => label.name).includes(label.name)) {
            thisStatusLabel = label;
          }
        });
        issue.progressTag = thisStatusLabel;

        // set priority label
        // uses the assumption that only one priority label is applied to each issue
        const thisPriorityLabel = nullLabel;
        labels.forEach((label) => {
          if (priorityLabels.map((label) => label.name).includes(label.name)) {
            thisPriorityLabel = label;
          }
        });
        issue.priority = thisPriorityLabel;
      });
    });
    resolve(processedIssues);
  });

  // put into local storage
  processedIssuesPromise.then((res) => {
    localStorage.setItem('refactored_issues', JSON.stringify(res));
  });

  return;
};
