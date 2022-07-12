import React from 'react';
import { addGitHubLabels } from '../helpers/addGitHubLabels';
import { removeGitHubLabel } from '../helpers/removeGitHubLabel';
import * as uuid from 'uuid';
import { ISSUES_KEY } from '../helpers/setupLocalStorage';
import {
  lowPriorityLabel,
  mediumPriorityLabel,
  highPriorityLabel
} from '../helpers/labels';

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

    updateLocalStorage(null);
  };

  const setLowPriority = (prev) => {
    // remove prev label
    removeGitHubLabel(issue.number, prev);
    // add new label
    addGitHubLabels(issue.number, [lowPriorityLabel.name]);
    // update local storage
    updateLocalStorage(lowPriorityLabel.name);
  };

  const setMediumPriority = (prev) => {
    // remove prev label
    removeGitHubLabel(issue.number, prev);
    // add new label
    addGitHubLabels(issue.number, [mediumPriorityLabel.name]);
    // update local storage
    updateLocalStorage(mediumPriorityLabel.name);
  };

  const setHighPriority = (prev) => {
    // remove prev label
    removeGitHubLabel(issue.number, prev);
    // add new label
    addGitHubLabels(issue.number, [highPriorityLabel.name]);
    // update local storage
    updateLocalStorage(highPriorityLabel.name);
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
        {issue.priority == null && (
          <button onClick={() => setLowPriority(null)}>{'>'}</button>
        )}
        {issue.priority == lowPriorityLabel.name && (
          <>
            <button onClick={() => setUnassigned(lowPriorityLabel.name)}>
              {`<`}
            </button>
            <button onClick={() => setMediumPriority(lowPriorityLabel.name)}>
              {'>'}
            </button>
          </>
        )}
        {issue.priority == mediumPriorityLabel.name && (
          <>
            <button
              onClick={() => setLowPriority(mediumPriorityLabel.name)}
            >{`<`}</button>
            <button onClick={() => setHighPriority(mediumPriorityLabel.name)}>
              {'>'}
            </button>
          </>
        )}
        {issue.priority == highPriorityLabel.name && (
          <button
            onClick={() => setMediumPriority(highPriorityLabel.name)}
          >{`<`}</button>
        )}
      </div>
      <p></p>
    </>
  );
}