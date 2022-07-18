// import { repo, owner, token } from './testCredentials';

const { Octokit } = require('@octokit/rest');

const CREDENTIALS_KEY = 'credentials';

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
