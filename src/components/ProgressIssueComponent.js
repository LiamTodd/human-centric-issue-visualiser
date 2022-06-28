import React from 'react';
import { addGitHubLabels } from '../helpers/addGitHubLabels';
import { removeGitHubLabel } from '../helpers/removeGitHubLabel';

const unresolvedLabel = 'Unresolved HCI';
const resolvingLabel = 'Resolving HCI';
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
        {type == null && (
          <button onClick={() => setUnresolved(null)}>move right</button>
        )}

        {type == unresolvedLabel && (
          <>
            <button onClick={() => setUnassigned(unresolvedLabel)}>
              move left
            </button>
            <button onClick={() => setResolving(unresolvedLabel)}>
              move right
            </button>
          </>
        )}

        {type == resolvingLabel && (
          <>
            <button onClick={() => setUnresolved(resolvingLabel)}>
              move left
            </button>
            <button onClick={() => setResolved(resolvingLabel)}>
              move right
            </button>
          </>
        )}

        {type == resolvedLabel && (
          <button onClick={() => setResolving(resolvedLabel)}>move left</button>
        )}
      </div>
      <p></p>
    </>
  );
}
