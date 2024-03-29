import { getGitHubIssues } from './getGitHubIssues';
import { getGitHubIssueComments } from './getGitHubIssueComments';
import { assignHCITags } from './assignHCITags';
import * as repoLabels from './labels';
import { fluffIssueAuthor } from './fluffIssueAuthor';

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

let validFound = false;

export const preProcessIssues = async () => {
  validFound = false; // need to reset flag on each call
  const issues = await generateIssues();
  return issues;
};

const generateIssues = async () => {
  // get issues and comments
  let issues = await getGitHubIssues();
  issues = await new Promise((resolve) => {
    issues.forEach((issue) => {
      getGitHubIssueComments(issue.number)
        .then((commentsResponse) => {
          // set comments
          issue.cached_comments = commentsResponse;
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
            .then(fluffIssueAuthor(issue)) // fluff author of issue (for testing/demo)
            .then(async () => {
              // validation
              if (!validFound) {
                // only have the possibility of recursion of a valid copy has NOT been set yet
                if (await validateIssues(issues)) {
                  validFound = true; // stop recursive calls
                  resolve(issues);
                } else if (!(await validateIssues(issues))) {
                  generateIssues(); // recursive call
                }
              }
            });
        });
    });
  });
  return issues;
};

const validateIssues = async (issues) => {
  let valid = true;
  valid = await new Promise((resolve) => {
    issues.forEach((issue) => {
      if (
        issue.HCILabels == null ||
        issue.bodyHCILabels == null ||
        issue.cached_comments == null ||
        issue.priority == null ||
        issue.progressTag == null
      ) {
        valid = false;
      }
      if (issue.cached_comments != null) {
        issue.cached_comments.forEach((comment) => {
          if (comment.HCILabels == null) {
            valid = false;
          }
        });
      }
    });
    resolve(valid);
  });
  return valid;
};
