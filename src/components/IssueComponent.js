import React from 'react';

export default function IssueComponent({ issue }) {
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
      </div>
      <p></p>
    </>
  );
}
