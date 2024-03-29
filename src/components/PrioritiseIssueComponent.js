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
import Button from 'react-bootstrap/Button';

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
      <Card border="secondary" style={{ borderWidth: '0px' }}>
        <Card.Body>
          <a href={issue.html_url} style={{ color: 'black' }}>
            <Card.Title>{issue.title}</Card.Title>
          </a>
          HCIs:
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {issue.HCILabels.map((label) => {
              return (
                <div
                  style={{
                    borderRadius: '100%',
                    height: '4vh',
                    width: '4vh',
                    borderColor: 'grey',
                    padding: '10px',
                    margin: '0.2%',
                    backgroundColor: '#' + label.color + '80'
                  }}
                ></div>
              );
            })}
          </div>
          {issue.priority.name == null && (
            <Button
              variant="outline-secondary"
              onClick={() => setLowPriority(null)}
            >
              {'>'}
            </Button>
          )}
          {issue.priority.name == lowPriorityLabel.name && (
            <>
              <Button
                variant="outline-secondary"
                onClick={() => setUnassigned(lowPriorityLabel.name)}
              >
                {'<'}
              </Button>

              <Button
                variant="outline-secondary"
                onClick={() => setMediumPriority(lowPriorityLabel.name)}
              >
                {'>'}
              </Button>
            </>
          )}
          {issue.priority.name == mediumPriorityLabel.name && (
            <>
              <Button
                variant="outline-secondary"
                onClick={() => setLowPriority(mediumPriorityLabel.name)}
              >
                {'<'}
              </Button>
              <Button
                variant="outline-secondary"
                onClick={() => setHighPriority(mediumPriorityLabel.name)}
              >
                {'>'}
              </Button>
            </>
          )}
          {issue.priority.name == highPriorityLabel.name && (
            <Button
              variant="outline-secondary"
              onClick={() => setMediumPriority(highPriorityLabel.name)}
            >
              {'<'}
            </Button>
          )}
        </Card.Body>
      </Card>
    </>
  );
}
