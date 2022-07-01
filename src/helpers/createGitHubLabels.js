import { getGitHubLabels } from './getGitHubLabels';
import { repo, owner, token } from './testCredentials';

const { Octokit } = require('@octokit/rest');

export const createGitHubLabels = async () => {
  const octokit = new Octokit({
    auth: token
  });

  const repoLabels = await getGitHubLabels();
  const labelNames = repoLabels.data.map((element) => {
    return element.name;
  });

  // User Reaction Label
  if (!labelNames.includes(userReactionLabel.name)) {
    await octokit.request(`POST /repos/${owner}/${repo}/labels`, {
      owner: owner,
      repo: repo,
      name: userReactionLabel.name,
      description: userReactionLabel.description,
      color: userReactionLabel.color
    });
  }

  // Inclusiveness Label
  if (!labelNames.includes(inclusivenessLabel.name)) {
    await octokit.request(`POST /repos/${owner}/${repo}/labels`, {
      owner: owner,
      repo: repo,
      name: inclusivenessLabel.name,
      description: inclusivenessLabel.description,
      color: inclusivenessLabel.color
    });
  }

  // App Usage Label
  if (!labelNames.includes(appUsageLabel.name)) {
    await octokit.request(`POST /repos/${owner}/${repo}/labels`, {
      owner: owner,
      repo: repo,
      name: appUsageLabel.name,
      description: appUsageLabel.description,
      color: appUsageLabel.color
    });
  }

  // Unresolved Label
  if (!labelNames.includes(unresolvedHCILabel.name)) {
    await octokit.request(`POST /repos/${owner}/${repo}/labels`, {
      owner: owner,
      repo: repo,
      name: unresolvedHCILabel.name,
      description: unresolvedHCILabel.description,
      color: unresolvedHCILabel.color
    });
  }

  // Resolving Label
  if (!labelNames.includes(resolvingHCILabel.name)) {
    await octokit.request(`POST /repos/${owner}/${repo}/labels`, {
      owner: owner,
      repo: repo,
      name: resolvingHCILabel.name,
      description: resolvingHCILabel.description,
      color: resolvingHCILabel.color
    });
  }

  // Resolved Label
  if (!labelNames.includes(resolvedHCILabel.name)) {
    await octokit.request(`POST /repos/${owner}/${repo}/labels`, {
      owner: owner,
      repo: repo,
      name: resolvedHCILabel.name,
      description: resolvedHCILabel.description,
      color: resolvedHCILabel.color
    });
  }
};
