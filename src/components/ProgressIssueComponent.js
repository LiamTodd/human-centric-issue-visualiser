import React from 'react';
import { addGitHubLabels } from '../helpers/addGitHubLabels';
import { removeGitHubLabel } from '../helpers/removeGitHubLabel';
import * as uuid from 'uuid';
import {
  resolvedHCILabel,
  resolvingHCILabel,
  unresolvedHCILabel
} from '../helpers/labels';
import { ISSUES_KEY } from '../helpers/localStorageKeys';

import Card from 'react-bootstrap/Card';

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
      <Card border="secondary">
        <Card.Header style={{ backgroundColor: '#' + issue.priority.color }}>
          {issue.priority.name}
        </Card.Header>
        <Card.Body>
          <a href={issue.html_url} style={{ color: 'black' }}>
            <Card.Title>{issue.title}</Card.Title>
          </a>
          HCIs:
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {issue.HCILabels.map((HCILabel) => {
              return (
                <div
                  style={{
                    margin: '10px',
                    width: '30%',
                    borderRadius: '20px',
                    backgroundColor: '#' + HCILabel.color + '80' // change opacity
                  }}
                  key={uuid.v4()}
                >
                  {HCILabel.name}
                </div>
              );
            })}
          </div>
          <Card.Text>ML Confidence: {issue.confidence}</Card.Text>
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
        </Card.Body>
      </Card>
    </>
  );
}
