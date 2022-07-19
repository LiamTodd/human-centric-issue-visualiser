import React from 'react';
import { addGitHubLabels } from '../helpers/addGitHubLabels';
import { removeGitHubLabel } from '../helpers/removeGitHubLabel';
import * as uuid from 'uuid';
import {
  lowPriorityLabel,
  mediumPriorityLabel,
  highPriorityLabel
} from '../helpers/labels';
import { ISSUES_KEY } from '../helpers/localStorageKeys';

import Card from 'react-bootstrap/Card';

export default function PrioritiseIssueComponent({ issue, setIssues }) {
  const updateLocalStorage = (newPriorityLabel) => {
    // update issues in local storage and trigger re-render
    const issues = JSON.parse(localStorage.getItem(ISSUES_KEY));
    // access current issue, remove its previous label
    const updatedIssues = issues.map((anIssue) => {
      if (anIssue.number == issue.number) {
        anIssue.priority = newPriorityLabel;
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

  const setLowPriority = (prev) => {
    // remove prev label
    removeGitHubLabel(issue.number, prev);
    // add new label
    addGitHubLabels(issue.number, [lowPriorityLabel.name]);
    // update local storage
    updateLocalStorage(lowPriorityLabel);
  };

  const setMediumPriority = (prev) => {
    // remove prev label
    removeGitHubLabel(issue.number, prev);
    // add new label
    addGitHubLabels(issue.number, [mediumPriorityLabel.name]);
    // update local storage
    updateLocalStorage(mediumPriorityLabel);
  };

  const setHighPriority = (prev) => {
    // remove prev label
    removeGitHubLabel(issue.number, prev);
    // add new label
    addGitHubLabels(issue.number, [highPriorityLabel.name]);
    // update local storage
    updateLocalStorage(highPriorityLabel);
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
          {issue.priority.name == null && (
            <button onClick={() => setLowPriority(null)}>{'>'}</button>
          )}
          {issue.priority.name == lowPriorityLabel.name && (
            <>
              <button onClick={() => setUnassigned(lowPriorityLabel.name)}>
                {`<`}
              </button>
              <button onClick={() => setMediumPriority(lowPriorityLabel.name)}>
                {'>'}
              </button>
            </>
          )}
          {issue.priority.name == mediumPriorityLabel.name && (
            <>
              <button
                onClick={() => setLowPriority(mediumPriorityLabel.name)}
              >{`<`}</button>
              <button onClick={() => setHighPriority(mediumPriorityLabel.name)}>
                {'>'}
              </button>
            </>
          )}
          {issue.priority.name == highPriorityLabel.name && (
            <button
              onClick={() => setMediumPriority(highPriorityLabel.name)}
            >{`<`}</button>
          )}
        </Card.Body>
      </Card>
    </>
  );
}
