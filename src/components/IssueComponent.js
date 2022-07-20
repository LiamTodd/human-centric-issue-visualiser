import React, { useState, useEffect } from 'react';
import * as uuid from 'uuid';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

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
          {issue.priority.name && <div>{issue.priority.name}</div>}
          {!issue.priority.name && <div>Unassigned Priority</div>}
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
                    borderColor: 'grey',
                    padding: '10px',
                    margin: '0.2%',
                    backgroundColor: '#' + label.color + '80'
                  }}
                ></div>
              );
            })}
          </div>
          <br></br>
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
          <Button variant="outline-secondary" onClick={toggleShowComments}>
            Comments
          </Button>
          {showComments ? (
            comments.length == 0 ? (
              <div>There are no comments under this issue</div>
            ) : (
              comments.map((comment) => {
                return (
                  <div>
                    <br></br>
                    <div style={{ justifyContent: 'center', display: 'flex' }}>
                      <Card border="secondary" style={{ width: '70%' }}>
                        <Card.Body>
                          <Card.Text>{comment.body}</Card.Text>
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
                                    padding: '10px',
                                    margin: '0.2%',
                                    backgroundColor: '#' + label.color + '80'
                                  }}
                                ></div>
                              );
                            })}
                          </div>
                          By: {comment.user.login} on{' '}
                          {comment.created_at.slice(0, 10)}
                        </Card.Body>
                      </Card>
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
