import React, { useState, useEffect } from 'react';
import * as uuid from 'uuid';

import Card from 'react-bootstrap/Card';

export default function CorrectionIssueComponent({ issue }) {
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
          HCIs:
          <div style={{ justifyContent: 'center', display: 'flex' }}>
            {issue.HCILabels.map((HCILabel) => {
              return (
                <div
                  style={{
                    margin: '10px',
                    width: '20%',
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
        </Card.Body>
      </Card>
      <br></br>
    </>
  );
}
