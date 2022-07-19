import React from 'react';
import { addGitHubLabels } from '../helpers/addGitHubLabels';
import { removeGitHubLabel } from '../helpers/removeGitHubLabel';
import * as uuid from 'uuid';
import {
  resolvedHCILabel,
  resolvingHCILabel,
  unresolvedHCILabel
} from '../helpers/labels';
import { ISSUES_KEY, READY_KEY } from '../helpers/localStorageKeys';

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

    updateLocalStorage({ name: null, color: null });
  };

  const setUnresolved = (prev) => {
    // remove prev label
    removeGitHubLabel(issue.number, prev);
    // add new label
    addGitHubLabels(issue.number, [unresolvedHCILabel.name]);
    // update local storage
    updateLocalStorage(unresolvedHCILabel);
  };

  const setResolving = (prev) => {
    // remove prev label
    removeGitHubLabel(issue.number, prev);
    // add new label
    addGitHubLabels(issue.number, [resolvingHCILabel.name]);
    // update local storage
    updateLocalStorage(resolvingHCILabel);
  };

  const setResolved = (prev) => {
    // remove prev label
    removeGitHubLabel(issue.number, prev);
    // add new label
    addGitHubLabels(issue.number, [resolvedHCILabel.name]);
    // update local storage
    updateLocalStorage(resolvedHCILabel);
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
        <h3 style={{ backgroundColor: '#' + issue.priority.color }}>
          {issue.priority.name}
        </h3>
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
                margin: '10px',
                backgroundColor: '#' + HCILabel.color + '80' // change opacity
              }}
              key={uuid.v4()}
            >
              {HCILabel.name}
            </div>
          );
        })}
        ML Confidence: {issue.confidence}
        <p></p>
        {issue.progressTag.name == null && (
          <button onClick={() => setUnresolved(null)}>{'>'}</button>
        )}
        {issue.progressTag.name == unresolvedHCILabel.name && (
          <>
            <button onClick={() => setUnassigned(unresolvedHCILabel.name)}>
              {`<`}
            </button>
            <button onClick={() => setResolving(unresolvedHCILabel.name)}>
              {'>'}
            </button>
          </>
        )}
        {issue.progressTag.name == resolvingHCILabel.name && (
          <>
            <button
              onClick={() => setUnresolved(resolvingHCILabel.name)}
            >{`<`}</button>
            <button onClick={() => setResolved(resolvingHCILabel.name)}>
              {'>'}
            </button>
          </>
        )}
        {issue.progressTag.name == resolvedHCILabel.name && (
          <button
            onClick={() => setResolving(resolvedHCILabel.name)}
          >{`<`}</button>
        )}
      </div>
      <p></p>
    </>
  );
}
