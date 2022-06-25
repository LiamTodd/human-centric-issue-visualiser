import { repo, owner, token } from './testCredentials';

const { Octokit } = require('@octokit/rest');
const userReactionLabel = {
  name: 'User Reaction',
  description: 'TODO: need to find out what goes here',
  color: 'FF66FF'
};
const inclusivenessLabel = {
  name: 'Inclusiveness',
  description: 'TODO: need to find out what goes here',
  color: '6666FF'
};
const appUsageLabel = {
  name: 'App Usage',
  description: 'TODO: need to find out what goes here',
  color: '66B2FF'
};

export const createGitHubLabels = async () => {
  const octokit = new Octokit({
    auth: token
  });

  // User Reaction Label
  await octokit.request(`POST /repos/${owner}/${repo}/labels`, {
    owner: owner,
    repo: repo,
    name: userReactionLabel.name,
    description: userReactionLabel.description,
    color: userReactionLabel.color
  });

  // Inclusiveness Label
  await octokit.request(`POST /repos/${owner}/${repo}/labels`, {
    owner: owner,
    repo: repo,
    name: inclusivenessLabel.name,
    description: inclusivenessLabel.description,
    color: inclusivenessLabel.color
  });

  // App Usage Label
  await octokit.request(`POST /repos/${owner}/${repo}/labels`, {
    owner: owner,
    repo: repo,
    name: appUsageLabel.name,
    description: appUsageLabel.description,
    color: appUsageLabel.color
  });
};
