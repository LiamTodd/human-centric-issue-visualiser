import { CREDENTIALS_KEY } from './localStorageKeys';

const { Octokit } = require('@octokit/rest');

export const getGitHubIssueComments = async (issueNumber) => {
  const octokit = new Octokit({
    auth: JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).token
  });

  const response = await octokit.paginate(
    `GET /repos/${JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).userName}/${
      JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).repoName
    }/issues/${issueNumber}/comments`,
    {
      owner: JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).userName,
      repo: JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).repoName,
      issue_number: issueNumber
    }
  );

  return response;
};
