import { repo, owner, token } from './testCredentials';

const { Octokit } = require('@octokit/rest');

export const removeGitHubLabel = async (issueNumber, name) => {
  const octokit = new Octokit({
    auth: token
  });

  await octokit.request(
    `DELETE /repos/{owner}/{repo}/issues/{issue_number}/labels/{name}`,
    {
      owner: owner,
      repo: repo,
      issue_number: issueNumber,
      name: name
    }
  );
};
