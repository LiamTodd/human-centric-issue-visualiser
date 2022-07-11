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

  const showConfidence = (e, HCILabel) => {
    e.target.innerHTML =
      HCILabel + ', ML Confidence: ' + Math.random().toPrecision(2);
  };
  const stopShowConfidence = (e, HCILabel) => {
    e.target.innerHTML = HCILabel;
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
                    margin: '10px'
                  }}
                  key={uuid.v4()}
                  onMouseOver={(e) => showConfidence(e, HCILabel)}
                  onMouseLeave={(e) => stopShowConfidence(e, HCILabel)}
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
