import { CREDENTIALS_KEY, ISSUES_KEY } from './localStorageKeys';
import * as labels from './labels';
import { getGitHubLabels } from './getGitHubLabels';

const { Octokit } = require('@octokit/rest');

export const cleanRepo = async () => {
  const octokit = new Octokit({
    auth: JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).token
  });

  // get label names in repo
  const repoLabels = await getGitHubLabels();
  const labelNames = repoLabels.map((element) => {
    return element.name;
  });
  console.log('all labels', labelNames);
  const deletableLabels = labelNames.filter(
    (labelName) =>
      labelName === labels.appUsageLabel.name ||
      labelName === labels.highPriorityLabel.name ||
      labelName === labels.inclusivenessLabel.name ||
      labelName === labels.lowPriorityLabel.name ||
      labelName === labels.mediumPriorityLabel.name ||
      labelName === labels.noHCIIdentifiedLabel.name ||
      labelName === labels.resolvedHCILabel.name ||
      labelName === labels.resolvingHCILabel.name ||
      labelName === labels.unresolvedHCILabel.name ||
      labelName === labels.userReactionLabel.name
  );

  console.log('removing the following labels from repo: ', deletableLabels);

  deletableLabels.forEach(async (labelName) => {
    try {
      await octokit.request('DELETE /repos/{owner}/{repo}/labels/{name}', {
        owner: JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).userName,
        repo: JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).repoName,
        name: labelName
      });
    } catch (e) {
      console.log(e);
    }
  });

  localStorage.removeItem(CREDENTIALS_KEY);
  localStorage.removeItem(ISSUES_KEY);
  return;
};
