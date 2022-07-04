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

  return (
    <>
      <div
        style={{
          borderWidth: '2px',
          borderStyle: 'solid',
          borderColor: 'black'
        }}
      >
        <h3>Issue Title: {issue.title}</h3>
        <h5>Issue Body: {issue.body}</h5>

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
                    margin: '10px'
                  }}
                  key={uuid.v4()}
                >
                  {HCILabel}
                </div>
              );
            })}
          </div>
          Comments:
          {comments.map((comment) => {
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
          })}
        </div>
      </div>
      <p></p>
    </>
  );
}
