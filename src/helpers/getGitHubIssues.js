const { Octokit } = require('@octokit/rest');
import { repo, owner, token } from './testCredentials';

export const getGitHubIssues = async () => {
  const octokit = new Octokit({
    auth: token
  });

  const response = await octokit.request(`GET /repos/${owner}/${repo}/issues`, {
    owner: owner,
    repo: repo
  });

  return response;
};
