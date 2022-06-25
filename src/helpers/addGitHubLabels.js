import { repo, owner, token } from './testCredentials';

const { Octokit } = require('@octokit/rest');

export const addGitHubLabels = async (issueNumber, labels = []) => {
  const octokit = new Octokit({
    auth: token
  });

  await octokit.request(
    `POST /repos/${owner}/${repo}/issues/${issueNumber}/labels`,
    {
      labels: labels
    }
  );
};
