import { getGitHubLabels } from './getGitHubLabels';
import * as labels from './labels';

const { Octokit } = require('@octokit/rest');
const CREDENTIALS_KEY = 'credentials';

export const createGitHubLabels = async () => {
  const octokit = new Octokit({
    auth: JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).token
  });

  const repoLabels = await getGitHubLabels();
  const labelNames = repoLabels.data.map((element) => {
    return element.name;
  });

  // User Reaction Label
  if (!labelNames.includes(labels.userReactionLabel.name)) {
    await octokit.request(
      `POST /repos/${
        JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).userName
      }/${JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).repoName}/labels`,
      {
        owner: JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).userName,
        repo: JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).repoName,
        name: labels.userReactionLabel.name,
        description: labels.userReactionLabel.description,
        color: labels.userReactionLabel.color
      }
    );
  }

  // Inclusiveness Label
  if (!labelNames.includes(labels.inclusivenessLabel.name)) {
    await octokit.request(
      `POST /repos/${
        JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).userName
      }/${JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).repoName}/labels`,
      {
        owner: JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).userName,
        repo: JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).repoName,
        name: labels.inclusivenessLabel.name,
        description: labels.inclusivenessLabel.description,
        color: labels.inclusivenessLabel.color
      }
    );
  }

  // App Usage Label
  if (!labelNames.includes(labels.appUsageLabel.name)) {
    await octokit.request(
      `POST /repos/${
        JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).userName
      }/${JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).repoName}/labels`,
      {
        owner: JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).userName,
        repo: JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).repoName,
        name: labels.appUsageLabel.name,
        description: labels.appUsageLabel.description,
        color: labels.appUsageLabel.color
      }
    );
  }

  // No HCIs label
  if (!labelNames.includes(labels.noHCIIdentifiedLabel.name)) {
    await octokit.request(
      `POST /repos/${
        JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).userName
      }/${JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).repoName}/labels`,
      {
        owner: JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).userName,
        repo: JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).repoName,
        name: labels.noHCIIdentifiedLabel.name,
        description: labels.noHCIIdentifiedLabel.description,
        color: labels.noHCIIdentifiedLabel.color
      }
    );
  }

  // Unresolved Label
  if (!labelNames.includes(labels.unresolvedHCILabel.name)) {
    await octokit.request(
      `POST /repos/${
        JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).userName
      }/${JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).repoName}/labels`,
      {
        owner: JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).userName,
        repo: JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).repoName,
        name: labels.unresolvedHCILabel.name,
        description: labels.unresolvedHCILabel.description,
        color: labels.unresolvedHCILabel.color
      }
    );
  }

  // Resolving Label
  if (!labelNames.includes(labels.resolvingHCILabel.name)) {
    await octokit.request(
      `POST /repos/${
        JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).userName
      }/${JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).repoName}/labels`,
      {
        owner: JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).userName,
        repo: JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).repoName,
        name: labels.resolvingHCILabel.name,
        description: labels.resolvingHCILabel.description,
        color: labels.resolvingHCILabel.color
      }
    );
  }

  // Resolved Label
  if (!labelNames.includes(labels.resolvedHCILabel.name)) {
    await octokit.request(
      `POST /repos/${
        JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).userName
      }/${JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).repoName}/labels`,
      {
        owner: JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).userName,
        repo: JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).repoName,
        name: labels.resolvedHCILabel.name,
        description: labels.resolvedHCILabel.description,
        color: labels.resolvedHCILabel.color
      }
    );
  }

  // Low Priority
  if (!labelNames.includes(labels.lowPriorityLabel.name)) {
    await octokit.request(
      `POST /repos/${
        JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).userName
      }/${JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).repoName}/labels`,
      {
        owner: JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).userName,
        repo: JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).repoName,
        name: labels.lowPriorityLabel.name,
        description: labels.lowPriorityLabel.description,
        color: labels.lowPriorityLabel.color
      }
    );
  }
  // Medium Priority
  if (!labelNames.includes(labels.mediumPriorityLabel.name)) {
    await octokit.request(
      `POST /repos/${
        JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).userName
      }/${JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).repoName}/labels`,
      {
        owner: JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).userName,
        repo: JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).repoName,
        name: labels.mediumPriorityLabel.name,
        description: labels.mediumPriorityLabel.description,
        color: labels.mediumPriorityLabel.color
      }
    );
  }
  // High Priority
  if (!labelNames.includes(labels.highPriorityLabel.name)) {
    await octokit.request(
      `POST /repos/${
        JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).userName
      }/${JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).repoName}/labels`,
      {
        owner: JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).userName,
        repo: JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).repoName,
        name: labels.highPriorityLabel.name,
        description: labels.highPriorityLabel.description,
        color: labels.highPriorityLabel.color
      }
    );
  }
};
