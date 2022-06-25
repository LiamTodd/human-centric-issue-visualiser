const { Octokit } = require('@octokit/rest');
import { repo, owner, token } from './testCredentials';

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
