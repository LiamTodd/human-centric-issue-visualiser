import React, { useState, useEffect } from 'react';
import * as uuid from 'uuid';

import Card from 'react-bootstrap/Card';

export default function IssueComponent({ issue }) {
  const [comments, setComments] = useState([]);

  const getComments = async () => {
    setComments(issue.cached_comments);
  };

  useEffect(() => {
    getComments();
  }, []);

  const [showComments, setShowComments] = useState(false);

  const toggleShowComments = () => {
    setShowComments(!showComments);
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
          {issue.body}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {issue.bodyHCILabels.map((label) => {
              return (
                <div
                  style={{
                    borderRadius: '100%',
                    height: '4vh',
                    width: '4vh',
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    borderColor: 'black',
                    padding: '10px',
                    margin: '0.2%',
                    backgroundColor: '#' + label.color + '80'
                  }}
                ></div>
              );
            })}
          </div>
          <br></br>
          Raised by {issue.user.login}, Last updated at{' '}
          {Date(issue.updated_at).toLocaleString()}
          <br></br>
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
          <Card.Text>ML Confidence: {issue.confidence}</Card.Text>
          <button onClick={toggleShowComments}>Comments</button>
          {showComments ? (
            comments.length == 0 ? (
              <div>There are no comments under this issue</div>
            ) : (
              comments.map((comment) => {
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
                    {comment.body}

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center'
                      }}
                    >
                      {comment.HCILabels.map((label) => {
                        return (
                          <div
                            style={{
                              borderRadius: '100%',
                              height: '4vh',
                              width: '4vh',
                              borderWidth: '2px',
                              borderStyle: 'solid',
                              borderColor: 'black',
                              padding: '10px',
                              margin: '0.2%',
                              backgroundColor: '#' + label.color + '80'
                            }}
                          ></div>
                        );
                      })}
                    </div>

                    <div
                      style={{
                        borderWidth: '2px',
                        borderStyle: 'solid',
                        borderColor: 'black',
                        margin: '10px'
                      }}
                    >
                      By: {comment.user.login} on {comment.created_at}
                    </div>
                  </div>
                );
              })
            )
          ) : null}
        </Card.Body>
      </Card>
      <br></br>
    </>
  );
}
