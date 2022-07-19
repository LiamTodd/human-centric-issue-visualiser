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
import Button from 'react-bootstrap/Button';

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
          {issue.priority.name && <div>{issue.priority.name}</div>}
          {!issue.priority.name && <div>Unassigned Priority</div>}
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
            <Button
              variant="outline-secondary"
              onClick={() => setUnresolved(null)}
            >
              {'>'}
            </Button>
          )}
          {issue.progressTag.name == unresolvedHCILabel.name && (
            <>
              <Button
                variant="outline-secondary"
                onClick={() => setUnassigned(unresolvedHCILabel.name)}
              >
                {'<'}
              </Button>
              <Button
                variant="outline-secondary"
                onClick={() => setResolving(unresolvedHCILabel.name)}
              >
                {'>'}
              </Button>
            </>
          )}
          {issue.progressTag.name == resolvingHCILabel.name && (
            <>
              <Button
                variant="outline-secondary"
                onClick={() => setUnresolved(resolvingHCILabel.name)}
              >
                {'<'}
              </Button>
              <Button
                variant="outline-secondary"
                onClick={() => setResolved(resolvingHCILabel.name)}
              >
                {'>'}
              </Button>
            </>
          )}
          {issue.progressTag.name == resolvedHCILabel.name && (
            <Button
              variant="outline-secondary"
              onClick={() => setResolving(resolvedHCILabel.name)}
            >
              {'<'}
            </Button>
          )}
        </Card.Body>
      </Card>
    </>
  );
}
