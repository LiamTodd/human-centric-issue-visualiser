import { CREDENTIALS_KEY } from './localStorageKeys';

const { Octokit } = require('@octokit/rest');

export const getGitHubIssues = async () => {
  const octokit = new Octokit({
    auth: JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).token
  });

  const response = await octokit.paginate(
    `GET /repos/${JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).userName}/${
      JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).repoName
    }/issues`,
    {
      owner: JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).userName,
      repo: JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).repoName
    }
  );

  // Add logic to handle pagination/page limits

  return response;
};
