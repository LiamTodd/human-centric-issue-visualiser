import React, { useState, useEffect } from 'react';
import * as uuid from 'uuid';
import ProgressIssueComponent from './ProgressIssueComponent';
import { ISSUES_KEY } from '../helpers/setupLocalStorage';
import {
  resolvedHCILabel,
  resolvingHCILabel,
  unresolvedHCILabel
} from '../helpers/labels';

export default function ProgressViewComponent() {
  const [issues, setIssues] = useState([]);

  const getIssues = async () => {
    setIssues(JSON.parse(localStorage.getItem(ISSUES_KEY)));
  };

  useEffect(() => {
    getIssues();
  }, []);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridGap: 20
      }}
    >
      <div>
        <h5>Unassigned</h5>
        <div>
          {issues
            .filter((issue) => issue.progressTag.name == null)
            .map((issue) => {
              return (
                <div>
                  <ProgressIssueComponent
                    issue={issue}
                    key={uuid.v4()}
                    setIssues={setIssues}
                  ></ProgressIssueComponent>
                </div>
              );
            })}
        </div>
      </div>
      <div>
        <h5>Unresolved</h5>
        {issues
          .filter((issue) => issue.progressTag.name == unresolvedHCILabel.name)
          .map((issue) => {
            return (
              <div>
                <ProgressIssueComponent
                  issue={issue}
                  key={uuid.v4()}
                  setIssues={setIssues}
                ></ProgressIssueComponent>
              </div>
            );
          })}
      </div>
      <div>
        <h5>Resolving</h5>
        {issues
          .filter((issue) => issue.progressTag.name == resolvingHCILabel.name)
          .map((issue) => {
            return (
              <div>
                <ProgressIssueComponent
                  issue={issue}
                  key={uuid.v4()}
                  setIssues={setIssues}
                ></ProgressIssueComponent>
              </div>
            );
          })}
      </div>
      <div>
        <h5>Resolved</h5>
        {issues
          .filter((issue) => issue.progressTag.name == resolvedHCILabel.name)
          .map((issue) => {
            return (
              <div>
                <ProgressIssueComponent
                  issue={issue}
                  key={uuid.v4()}
                  setIssues={setIssues}
                ></ProgressIssueComponent>
              </div>
            );
          })}
      </div>
    </div>
  );
}
