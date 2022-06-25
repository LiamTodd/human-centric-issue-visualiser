import { repo, owner, token } from './testCredentials';

const { Octokit } = require('@octokit/rest');

export const getGitHubLabels = async () => {
  const octokit = new Octokit({
    auth: token
  });

  const response = await octokit.request(`GET /repos/${owner}/${repo}/labels`, {
    owner: owner,
    repo: repo
  });

  return response;
};
