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
  synchronousProcess(await getGitHubIssues());
  // const issues = await asyncProcess(
  //   synchronousProcess(await getGitHubIssues())
  // );
  // console.log(issues);
  // localStorage.setItem(
  //   'refactored-issues',
  //   JSON.stringify(asyncProcessedIssues)
  // );
  return;
};

const asyncProcess = async (issues) => {
  const processedIssues = issues.map(async (issue) => {
    // get comments
    issue.cached_comments = await getGitHubIssueComments(issue.number);

    // get/set ML response
    issue.HCILabels = await assignHCITags(issue);
  });
  return processedIssues;
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
