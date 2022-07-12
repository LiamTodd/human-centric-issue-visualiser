import React, { useState, useEffect } from 'react';
import * as uuid from 'uuid';
import { ISSUES_KEY } from '../helpers/setupLocalStorage';
import {
  lowPriorityLabel,
  mediumPriorityLabel,
  highPriorityLabel
} from '../helpers/labels';
import PrioritiseIssueComponent from './PrioritiseIssueComponent';

export default function PrioritiseViewComponent() {
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
            .filter((issue) => issue.priority == null)
            .map((issue) => {
              return (
                <div>
                  <PrioritiseIssueComponent
                    issue={issue}
                    key={uuid.v4()}
                    setIssues={setIssues}
                  ></PrioritiseIssueComponent>
                </div>
              );
            })}
        </div>
      </div>
      <div>
        <h5>Low Priority</h5>
        {issues
          .filter((issue) => issue.priority == lowPriorityLabel.name)
          .map((issue) => {
            return (
              <div>
                <PrioritiseIssueComponent
                  issue={issue}
                  key={uuid.v4()}
                  setIssues={setIssues}
                ></PrioritiseIssueComponent>
              </div>
            );
          })}
      </div>
      <div>
        <h5>Medium Priority</h5>
        {issues
          .filter((issue) => issue.priority == mediumPriorityLabel.name)
          .map((issue) => {
            return (
              <div>
                <PrioritiseIssueComponent
                  issue={issue}
                  key={uuid.v4()}
                  setIssues={setIssues}
                ></PrioritiseIssueComponent>
              </div>
            );
          })}
      </div>
      <div>
        <h5>High Priority</h5>
        {issues
          .filter((issue) => issue.priority == highPriorityLabel.name)
          .map((issue) => {
            return (
              <div>
                <PrioritiseIssueComponent
                  issue={issue}
                  key={uuid.v4()}
                  setIssues={setIssues}
                ></PrioritiseIssueComponent>
              </div>
            );
          })}
      </div>
    </div>
  );
}
