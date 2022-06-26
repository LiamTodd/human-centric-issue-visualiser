import { repo, owner, token } from './testCredentials';

const { Octokit } = require('@octokit/rest');

export const getGitHubIssueComments = async (issueNumber) => {
  const octokit = new Octokit({
    auth: token
  });

  const response = await octokit.request(
    `GET /repos/${owner}/${repo}/issues/${issueNumber}/comments`,
    {
      owner: owner,
      repo: repo,
      issue_number: issueNumber
    }
  );

  return response;
};
