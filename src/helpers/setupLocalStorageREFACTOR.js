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
  const issues = await asyncProcessedIssues();
  const processedIssues = synchronousProcess(issues);
  console.log(processedIssues);
  localStorage.setItem('refactored-issues', JSON.stringify(processedIssues));
  return;
};

const asyncProcessedIssues = async () => {
  // get issues
  const issues = await getGitHubIssues();
  issues.forEach(async (issue) => {
    // get comments
    issue.cached_comments = await getGitHubIssueComments(issue.number);

    // get/set ML response
    issue.HCILabels = await assignHCITags(issue);
  });
  return issues;
};

const synchronousProcess = (issues) => {
  issues.forEach((issue) => {
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
  return issues;
};
