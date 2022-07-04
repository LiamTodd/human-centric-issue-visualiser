import React, { useState, useEffect } from 'react';
import * as uuid from 'uuid';
import ProgressIssueComponent from './ProgressIssueComponent';
import { ISSUES_KEY } from '../helpers/setupLocalStorage';

const statusLabels = ['Unresolved HCI', 'Resolving HCI', 'Resolved HCI'];

export default function ProgressViewComponent() {
  const [issues, setIssues] = useState([[], [], [], []]);

  const getIssues = async () => {
    const cachedIssues = JSON.parse(localStorage.getItem(ISSUES_KEY));
    let res = [[], [], [], []];
    for (let i = 0; i <= cachedIssues.length - 1; i++) {
      let thisLabel = null;
      const labels = cachedIssues[i].labels.map((label) => {
        return label.name;
      });
      labels.forEach((label) => {
        if (statusLabels.includes(label)) {
          thisLabel = label;
        }
      });
      cachedIssues[i].type = thisLabel;

      if (thisLabel == null) {
        res[0].push(cachedIssues[i]);
      } else if (thisLabel == statusLabels[0]) {
        res[1].push(cachedIssues[i]);
      } else if (thisLabel == statusLabels[1]) {
        res[2].push(cachedIssues[i]);
      } else {
        res[3].push(cachedIssues[i]);
      }
    }
    setIssues(res);
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
          {issues[0].map((issue) => {
            return (
              <div>
                <ProgressIssueComponent
                  issue={issue}
                  key={uuid.v4()}
                  type={issue.type}
                  issues={issues}
                  setIssues={setIssues}
                ></ProgressIssueComponent>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <h5>Unresolved</h5>
        {issues[1].map((issue) => {
          return (
            <div>
              <ProgressIssueComponent
                issue={issue}
                key={uuid.v4()}
                type={issue.type}
                issues={issues}
                setIssues={setIssues}
              ></ProgressIssueComponent>
            </div>
          );
        })}
      </div>
      <div>
        <h5>Resolving</h5>
        {issues[2].map((issue) => {
          return (
            <div>
              <ProgressIssueComponent
                issue={issue}
                key={uuid.v4()}
                type={issue.type}
                issues={issues}
                setIssues={setIssues}
              ></ProgressIssueComponent>
            </div>
          );
        })}
      </div>
      <div>
        <h5>Resolved</h5>
        {issues[3].map((issue) => {
          return (
            <div>
              <ProgressIssueComponent
                issue={issue}
                key={uuid.v4()}
                type={issue.type}
                issues={issues}
                setIssues={setIssues}
              ></ProgressIssueComponent>
            </div>
          );
        })}
      </div>
    </div>
  );
}
