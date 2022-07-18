const { Octokit } = require('@octokit/rest');
const CREDENTIALS_KEY = 'credentials';

export const removeGitHubLabel = async (issueNumber, name) => {
  const octokit = new Octokit({
    auth: JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).token
  });

  await octokit.request(
    `DELETE /repos/{owner}/{repo}/issues/{issue_number}/labels/{name}`,
    {
      owner: JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).userName,
      repo: JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).repoName,
      issue_number: issueNumber,
      name: name
    }
  );
};
