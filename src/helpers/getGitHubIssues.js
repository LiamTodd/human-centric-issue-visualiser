// import { repo, owner, token } from './testCredentials';

const { Octokit } = require('@octokit/rest');
const CREDENTIALS_KEY = 'credentials';

export const getGitHubIssues = async () => {
  const octokit = new Octokit({
    auth: JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).token
  });

  const response = await octokit.request(
    `GET /repos/${JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).userName}/${
      JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).repoName
    }/issues`,
    {
      owner: JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).userName,
      repo: JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).repoName
    }
  );

  return response;
};
