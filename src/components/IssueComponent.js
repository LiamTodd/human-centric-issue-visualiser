import React, { useState, useEffect } from 'react';
import * as uuid from 'uuid';

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
      <div
        style={{
          borderWidth: '2px',
          borderStyle: 'solid',
          borderColor: 'black'
        }}
      >
        <h3 style={{ backgroundColor: '#' + issue.priority.color }}>
          {issue.priority.name}
        </h3>

        <a href={issue.html_url}>
          <h3>{issue.title}</h3>
        </a>
        <h5>{issue.body}</h5>

        <p>
          Raised by {issue.user.login}, Last updated at {issue.updated_at}
        </p>

        <div
          style={{
            paddingLeft: '10%',
            paddingRight: '10%',
            margin: '10px'
          }}
        >
          <div
            style={{
              paddingLeft: '10%',
              paddingRight: '10%',
              margin: '10px'
            }}
          >
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
                  {HCILabel.name + ', ML Confidence: ' + issue.confidence}
                </div>
              );
            })}
          </div>
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
        </div>
      </div>
      <p></p>
    </>
  );
}
