import React from 'react';

const unassigned = 'Unassigned';
const unresolved = 'Unresolved';
const resolving = 'Resolving';
const resolved = 'Resolved';

export default function ProgressIssueComponent({ issue, type }) {
  console.log(issue.title, type);
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
        {type == unassigned && <button>move right</button>}
        {type == unresolved && (
          <>
            <button>move left</button>
            <button>move right</button>
          </>
        )}
        {type == resolving && (
          <>
            <button>move left</button>
            <button>move right</button>
          </>
        )}
        {type == resolved && <button>move left</button>}
      </div>
      <p></p>
    </>
  );
}
