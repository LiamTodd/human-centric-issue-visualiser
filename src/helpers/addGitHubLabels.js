import { CREDENTIALS_KEY } from './localStorageKeys';

const { Octokit } = require('@octokit/rest');

export const addGitHubLabels = async (issueNumber, labels = []) => {
  const octokit = new Octokit({
    auth: JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).token
  });

  await octokit.request(
    `POST /repos/${
      JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).userName
    }/${
      JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).repoName
    }/issues/${issueNumber}/labels`,
    {
      labels: labels
    }
  );
};
