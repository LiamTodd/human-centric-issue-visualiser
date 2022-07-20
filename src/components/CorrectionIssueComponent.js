import React, { useState, useEffect } from 'react';
import * as uuid from 'uuid';
import * as repoLabels from '../helpers/labels';

import Card from 'react-bootstrap/Card';

export default function CorrectionIssueComponent({ issue }) {
  const allHCILabels = [
    repoLabels.appUsageLabel,
    repoLabels.inclusivenessLabel,
    repoLabels.userReactionLabel
  ];
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
          Click to unassign from this issue:
          <div style={{ justifyContent: 'center', display: 'flex' }}>
            {issue.HCILabels.map((HCILabel) => {
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
                >
                  {HCILabel.name}
                </button>
              );
            })}
          </div>
          <br></br>
          Click to assign to this issue:
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
                  >
                    {HCILabel.name}
                  </button>
                );
              })}
          </div>
          <Card.Text>ML Confidence: {issue.confidence}</Card.Text>
        </Card.Body>
      </Card>
      <br></br>
    </>
  );
}
