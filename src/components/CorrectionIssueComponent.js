import React, { useState, useEffect } from 'react';
import * as uuid from 'uuid';
import * as repoLabels from '../helpers/labels';
import { removeGitHubLabel } from '../helpers/removeGitHubLabel';
import { addGitHubLabels } from '../helpers/addGitHubLabels';

import Card from 'react-bootstrap/Card';
import { ISSUES_KEY } from '../helpers/localStorageKeys';

const allHCILabels = [
  repoLabels.appUsageLabel,
  repoLabels.inclusivenessLabel,
  repoLabels.userReactionLabel
];

export default function CorrectionIssueComponent({ issue, setIssues }) {
  const updateLocalStorage = (updatedHCILabels) => {
    // update issues in local storage and trigger re-render
    const issues = JSON.parse(localStorage.getItem(ISSUES_KEY));
    // access current issue, remove its previous label
    const updatedIssues = issues.map((anIssue) => {
      if (anIssue.number == issue.number) {
        anIssue.HCILabels = updatedHCILabels;
      }
      return anIssue;
    });

    localStorage.setItem(ISSUES_KEY, JSON.stringify(updatedIssues));
    setIssues(updatedIssues);
  };

  const addTag = (HCILabel) => {
    addGitHubLabels(issue.number, [HCILabel.name]);
    if (
      issue.HCILabels.map((label) => label.name).includes(
        repoLabels.noHCIIdentifiedLabel.name
      )
    ) {
      removeGitHubLabel(issue.number, repoLabels.noHCIIdentifiedLabel.name);
      issue.HCILabels = [];
    }
    issue.HCILabels.push(HCILabel);
    updateLocalStorage(issue.HCILabels);
  };

  const removeTag = (HCILabel) => {
    removeGitHubLabel(issue.number, HCILabel.name);
    issue.HCILabels = issue.HCILabels.filter(
      (label) => label.name != HCILabel.name
    );
    if (issue.HCILabels.length == 0) {
      addGitHubLabels(issue.number, [repoLabels.noHCIIdentifiedLabel.name]);
      issue.HCILabels.push(repoLabels.noHCIIdentifiedLabel);
    }
    updateLocalStorage(issue.HCILabels);
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
          {issue.body}
          Raised by {issue.user.login}, {issue.created_at.slice(0, 10)}
          <br></br>
          <br></br>
          <div style={{ border: '2px solid red', borderRadius: '20px' }}>
            <h5>Click to unassign from this issue:</h5>
            <div style={{ justifyContent: 'center', display: 'flex' }}>
              {issue.HCILabels.filter(
                (label) => label.name != repoLabels.noHCIIdentifiedLabel.name
              ).map((HCILabel) => {
                return (
                  <button
                    style={{
                      margin: '10px',
                      width: '20%',
                      borderRadius: '20px',
                      borderWidth: '0px',
                      backgroundColor: '#' + HCILabel.color + '80' // change opacity
                    }}
                    key={uuid.v4()}
                    onClick={() => removeTag(HCILabel)}
                  >
                    {HCILabel.name}
                  </button>
                );
              })}
            </div>
          </div>
          <br></br>
          <div style={{ border: '2px solid green', borderRadius: '20px' }}>
            <h5>Click to assign to this issue:</h5>
            <div style={{ justifyContent: 'center', display: 'flex' }}>
              {allHCILabels
                .filter(
                  (HCILabel) =>
                    !issue.HCILabels.map((label) => {
                      return label.name;
                    }).includes(HCILabel.name)
                )
                .map((HCILabel) => {
                  return (
                    <button
                      style={{
                        margin: '10px',
                        width: '20%',
                        borderRadius: '20px',
                        borderWidth: '0px',
                        backgroundColor: '#' + HCILabel.color + '40' // change opacity
                      }}
                      key={uuid.v4()}
                      onClick={() => addTag(HCILabel)}
                    >
                      {HCILabel.name}
                    </button>
                  );
                })}
            </div>
          </div>
          <Card.Text>ML Confidence: {issue.confidence}</Card.Text>
        </Card.Body>
      </Card>
      <br></br>
    </>
  );
}
