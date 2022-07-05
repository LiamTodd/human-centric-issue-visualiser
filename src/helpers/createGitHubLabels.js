import { getGitHubLabels } from './getGitHubLabels';
import { repo, owner, token } from './testCredentials';
import * as labels from './labels';

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
  if (!labelNames.includes(labels.userReactionLabel.name)) {
    await octokit.request(`POST /repos/${owner}/${repo}/labels`, {
      owner: owner,
      repo: repo,
      name: labels.userReactionLabel.name,
      description: labels.userReactionLabel.description,
      color: labels.userReactionLabel.color
    });
  }

  // Inclusiveness Label
  if (!labelNames.includes(labels.inclusivenessLabel.name)) {
    await octokit.request(`POST /repos/${owner}/${repo}/labels`, {
      owner: owner,
      repo: repo,
      name: labels.inclusivenessLabel.name,
      description: labels.inclusivenessLabel.description,
      color: labels.inclusivenessLabel.color
    });
  }

  // App Usage Label
  if (!labelNames.includes(labels.appUsageLabel.name)) {
    await octokit.request(`POST /repos/${owner}/${repo}/labels`, {
      owner: owner,
      repo: repo,
      name: labels.appUsageLabel.name,
      description: labels.appUsageLabel.description,
      color: labels.appUsageLabel.color
    });
  }

  // No HCIs label
  if (!labelNames.includes(labels.noHCIIdentifiedLabel.name)) {
    await octokit.request(`POST /repos/${owner}/${repo}/labels`, {
      owner: owner,
      repo: repo,
      name: labels.noHCIIdentifiedLabel.name,
      description: labels.noHCIIdentifiedLabel.description,
      color: labels.noHCIIdentifiedLabel.color
    });
  }

  // Unresolved Label
  if (!labelNames.includes(labels.unresolvedHCILabel.name)) {
    await octokit.request(`POST /repos/${owner}/${repo}/labels`, {
      owner: owner,
      repo: repo,
      name: labels.unresolvedHCILabel.name,
      description: labels.unresolvedHCILabel.description,
      color: labels.unresolvedHCILabel.color
    });
  }

  // Resolving Label
  if (!labelNames.includes(labels.resolvingHCILabel.name)) {
    await octokit.request(`POST /repos/${owner}/${repo}/labels`, {
      owner: owner,
      repo: repo,
      name: labels.resolvingHCILabel.name,
      description: labels.resolvingHCILabel.description,
      color: labels.resolvingHCILabel.color
    });
  }

  // Resolved Label
  if (!labelNames.includes(labels.resolvedHCILabel.name)) {
    await octokit.request(`POST /repos/${owner}/${repo}/labels`, {
      owner: owner,
      repo: repo,
      name: labels.resolvedHCILabel.name,
      description: labels.resolvedHCILabel.description,
      color: labels.resolvedHCILabel.color
    });
  }
};
