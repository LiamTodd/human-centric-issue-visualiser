import React from 'react';
import { addGitHubLabels } from '../helpers/addGitHubLabels';
import { removeGitHubLabel } from '../helpers/removeGitHubLabel';
import * as uuid from 'uuid';
import { ISSUES_KEY } from '../helpers/setupLocalStorage';
import {
  resolvedHCILabel,
  resolvingHCILabel,
  unresolvedHCILabel
} from '../helpers/labels';

const unresolvedLabel = 'Unresolved HCI';
const resolvingLabel = 'Resolving HCI';
const resolvedLabel = 'Resolved HCI';

export default function ProgressIssueComponent({ issue, setIssues }) {
  const updateLocalStorage = (newStatusLabel) => {
    // update issues in local storage and trigger re-render
    const issues = JSON.parse(localStorage.getItem(ISSUES_KEY));
    // access current issue, remove its previous label
    const updatedIssues = issues.map((anIssue) => {
      if (anIssue.number == issue.number) {
        anIssue.progressTag = newStatusLabel;
      }
      return anIssue;
    });

    localStorage.setItem(ISSUES_KEY, JSON.stringify(updatedIssues));
    setIssues(updatedIssues);
  };
  const setUnassigned = (prev) => {
    // remove prev label
    removeGitHubLabel(issue.number, prev);

    updateLocalStorage(null);
  };

  const setUnresolved = (prev) => {
    // remove prev label
    removeGitHubLabel(issue.number, prev);
    // add new label
    addGitHubLabels(issue.number, [unresolvedLabel]);
    // update local storage
    updateLocalStorage(unresolvedHCILabel.name);
  };

  const setResolving = (prev) => {
    // remove prev label
    removeGitHubLabel(issue.number, prev);
    // add new label
    addGitHubLabels(issue.number, [resolvingLabel]);
    // update local storage
    updateLocalStorage(resolvingHCILabel.name);
  };

  const setResolved = (prev) => {
    // remove prev label
    removeGitHubLabel(issue.number, prev);
    // add new label
    addGitHubLabels(issue.number, [resolvedLabel]);
    // update local storage
    updateLocalStorage(resolvedHCILabel.name);
  };

  return (
    <>
      <div
        style={{
          borderWidth: '2px',
          borderStyle: 'solid',
          borderColor: 'black'
        }}
      >
        <a href={issue.html_url}>
          <h3>{issue.title}</h3>
        </a>
        HCIs:
        {issue.HCILabels.map((HCILabel) => {
          return (
            <div
              style={{
                borderWidth: '2px',
                borderStyle: 'solid',
                borderColor: 'black',
                margin: '10px'
              }}
              key={uuid.v4()}
            >
              {HCILabel + ', ML Confidence: ' + Math.random().toPrecision(2)}
            </div>
          );
        })}
        <p></p>
        {issue.progressTag == null && (
          <button onClick={() => setUnresolved(null)}>{'>'}</button>
        )}
        {issue.progressTag == unresolvedHCILabel.name && (
          <>
            <button onClick={() => setUnassigned(unresolvedHCILabel.name)}>
              {`<`}
            </button>
            <button onClick={() => setResolving(unresolvedHCILabel.name)}>
              {'>'}
            </button>
          </>
        )}
        {issue.progressTag == resolvingHCILabel.name && (
          <>
            <button
              onClick={() => setUnresolved(resolvingHCILabel.name)}
            >{`<`}</button>
            <button onClick={() => setResolved(resolvingHCILabel.name)}>
              {'>'}
            </button>
          </>
        )}
        {issue.progressTag == resolvedHCILabel.name && (
          <button
            onClick={() => setResolving(resolvedHCILabel.name)}
          >{`<`}</button>
        )}
      </div>
      <p></p>
    </>
  );
}
