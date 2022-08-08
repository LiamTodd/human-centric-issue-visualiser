import { getGitHubLabels } from './getGitHubLabels';
import * as labels from './labels';
import { CREDENTIALS_KEY } from './localStorageKeys';

const { Octokit } = require('@octokit/rest');

export const createGitHubLabels = async () => {
  const octokit = new Octokit({
    auth: JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).token
  });

  const repoLabels = await getGitHubLabels();
  const labelNames = repoLabels.map((element) => {
    return element.name;
  });

  // User Reaction Label
  if (!labelNames.includes(labels.userReactionLabel.name)) {
    try {
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
    } catch (e) {
      console.log(e);
    }
  }

  // Inclusiveness Label
  if (!labelNames.includes(labels.inclusivenessLabel.name)) {
    try {
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
    } catch (e) {
      console.log(e);
    }
  }

  // App Usage Label
  if (!labelNames.includes(labels.appUsageLabel.name)) {
    try {
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
    } catch (e) {
      console.log(e);
    }
  }

  // No HCIs label
  if (!labelNames.includes(labels.noHCIIdentifiedLabel.name)) {
    try {
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
    } catch (e) {
      console.log(e);
    }
  }

  // Unresolved Label
  if (!labelNames.includes(labels.unresolvedHCILabel.name)) {
    try {
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
    } catch (e) {
      console.log(e);
    }
  }

  // Resolving Label
  if (!labelNames.includes(labels.resolvingHCILabel.name)) {
    try {
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
    } catch (e) {
      console.log(e);
    }
  }

  // Resolved Label
  if (!labelNames.includes(labels.resolvedHCILabel.name)) {
    try {
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
    } catch (e) {
      console.log(e);
    }
  }

  // Low Priority
  if (!labelNames.includes(labels.lowPriorityLabel.name)) {
    try {
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
    } catch (e) {
      console.log(e);
    }
  }
  // Medium Priority
  if (!labelNames.includes(labels.mediumPriorityLabel.name)) {
    try {
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
    } catch (e) {
      console.log(e);
    }
  }
  // High Priority
  if (!labelNames.includes(labels.highPriorityLabel.name)) {
    try {
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
    } catch (e) {
      console.log(e);
    }
  }
};
