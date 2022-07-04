import React from 'react';
import { addGitHubLabels } from '../helpers/addGitHubLabels';
import { removeGitHubLabel } from '../helpers/removeGitHubLabel';
import * as uuid from 'uuid';

const unresolvedLabel = 'Unresolved HCI';
const resolvingLabel = 'Resolving HCI';
const resolvedLabel = 'Resolved HCI';

export default function ProgressIssueComponent({
  issue,
  type,
  issues,
  setIssues
}) {
  const setUnassigned = (prev) => {
    // remove prev label
    removeGitHubLabel(issue.number, prev);

    const index = issues[1].indexOf(issue);
    issues[1].splice(index, 1);
    issue.type = null;
    setIssues([issues[0].concat(issue), issues[1], issues[2], issues[3]]);
  };

  const setUnresolved = (prev) => {
    // remove prev label
    removeGitHubLabel(issue.number, prev);
    // add new label
    addGitHubLabels(issue.number, [unresolvedLabel]);

    if (prev == resolvingLabel) {
      const index = issues[2].indexOf(issue);
      issues[2].splice(index, 1);
    } else if (prev == null) {
      const index = issues[0].indexOf(issue);
      issues[0].splice(index, 1);
    }
    issue.type = unresolvedLabel;
    setIssues([issues[0], issues[1].concat(issue), issues[2], issues[3]]);
  };

  const setResolving = (prev) => {
    // remove prev label
    removeGitHubLabel(issue.number, prev);
    // add new label
    addGitHubLabels(issue.number, [resolvingLabel]);

    if (prev == resolvedLabel) {
      const index = issues[3].indexOf(issue);
      issues[3].splice(index, 1);
    } else if (prev == unresolvedLabel) {
      const index = issues[1].indexOf(issue);
      issues[1].splice(index, 1);
    }
    issue.type = resolvingLabel;
    setIssues([issues[0], issues[1], issues[2].concat(issue), issues[3]]);
  };

  const setResolved = (prev) => {
    // remove prev label
    removeGitHubLabel(issue.number, prev);
    // add new label
    addGitHubLabels(issue.number, [resolvedLabel]);

    const index = issues[2].indexOf(issue);
    issues[2].splice(index, 1);
    issue.type = resolvedLabel;
    setIssues([issues[0], issues[1], issues[2], issues[3].concat(issue)]);
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
        HCIs:
        {['mock HCI 1', 'mock HCI 2', 'mock HCI 3'].map((HCILabel) => {
          if (Math.floor(Math.random() * 3) == 1) {
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
          }
        })}
        <p></p>
        {type == null && (
          <button onClick={() => setUnresolved(null)}>{'>'}</button>
        )}
        {type == unresolvedLabel && (
          <>
            <button onClick={() => setUnassigned(unresolvedLabel)}>
              {`<`}
            </button>
            <button onClick={() => setResolving(unresolvedLabel)}>{'>'}</button>
          </>
        )}
        {type == resolvingLabel && (
          <>
            <button onClick={() => setUnresolved(resolvingLabel)}>{`<`}</button>
            <button onClick={() => setResolved(resolvingLabel)}>{'>'}</button>
          </>
        )}
        {type == resolvedLabel && (
          <button onClick={() => setResolving(resolvedLabel)}>{`<`}</button>
        )}
      </div>
      <p></p>
    </>
  );
}
