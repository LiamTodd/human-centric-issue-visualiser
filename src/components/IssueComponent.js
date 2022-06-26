import React, { useState, useEffect } from 'react';
import * as uuid from 'uuid';
import { getGitHubIssueComments } from '../helpers/getGitHubIssueComments';

export default function IssueComponent({ issue }) {
  const [comments, setComments] = useState([]);

  const getComments = async () => {
    const commentResponse = await getGitHubIssueComments(issue.number);
    let res = [];
    console.log(commentResponse.data.length);
    for (let i = 0; i <= commentResponse.data.length - 1; i++) {
      res.push(commentResponse.data[i]);
    }
    setComments(res);
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

        <div>
          Comments:
          {comments.map((comment) => {
            return (
              <div
                style={{
                  borderWidth: '2px',
                  borderStyle: 'dotted',
                  borderColor: 'black'
                }}
                key={uuid.v4()}
              >
                {comment.body}
              </div>
            );
          })}
        </div>
      </div>
      <p></p>
    </>
  );
}
