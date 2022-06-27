import React from 'react';
import { addGitHubLabels } from '../helpers/addGitHubLabels';
import { removeGitHubLabel } from '../helpers/removeGitHubLabel';

const unassigned = 'Unassigned';
const unresolved = 'Unresolved';
const unresolvedLabel = 'Unresolved HCI';
const resolving = 'Resolving';
const resolvingLabel = 'Resolving HCI';
const resolved = 'Resolved';
const resolvedLabel = 'Resolved HCI';

export default function ProgressIssueComponent({ issue, type }) {
  const setUnassigned = (prev) => {
    // remove prev label
    removeGitHubLabel(issue.number, prev);
  };
  const setUnresolved = (prev) => {
    // remove prev label
    removeGitHubLabel(issue.number, prev);
    // add new label
    addGitHubLabels(issue.number, [unresolvedLabel]);
  };
  const setResolving = (prev) => {
    // remove prev label
    removeGitHubLabel(issue.number, prev);
    // add new label
    addGitHubLabels(issue.number, [resolvingLabel]);
  };
  const setResolved = (prev) => {
    // remove prev label
    removeGitHubLabel(issue.number, prev);
    // add new label
    addGitHubLabels(issue.number, [resolvedLabel]);
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
        <h3>Issue Title: {issue.title}</h3>
        {type == unassigned && (
          <button onClick={() => setUnresolved(unassigned)}>move right</button>
        )}

        {type == unresolved && (
          <>
            <button onClick={() => setUnassigned(unresolvedLabel)}>
              move left
            </button>
            <button onClick={() => setResolving(unresolvedLabel)}>
              move right
            </button>
          </>
        )}

        {type == resolving && (
          <>
            <button onClick={() => setUnresolved(resolvingLabel)}>
              move left
            </button>
            <button onClick={() => setResolved(resolvingLabel)}>
              move right
            </button>
          </>
        )}

        {type == resolved && (
          <button onClick={() => setResolving(resolvedLabel)}>move left</button>
        )}
      </div>
      <p></p>
    </>
  );
}
