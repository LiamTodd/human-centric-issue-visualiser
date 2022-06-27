import React, { useState, useEffect } from 'react';
import { getGitHubIssues } from '../helpers/getGitHubIssues';
import ProgressIssueComponent from './ProgressIssueComponent';
import * as uuid from 'uuid';

const statusLabels = ['Unresolved HCI', 'Resolving HCI', 'Resolved HCI'];
const type = 'Unassigned';

export default function UnassignedColumnComponent() {
  const [issues, setIssues] = useState([]);

  const getIssues = async () => {
    const issueResponse = await getGitHubIssues();
    let res = [];
    for (let i = 0; i <= issueResponse.data.length - 1; i++) {
      let flag = true;
      const labels = issueResponse.data[i].labels.map((label) => {
        return label.name;
      });
      labels.forEach((label) => {
        if (statusLabels.includes(label)) {
          flag = false;
        }
      });

      if (flag) {
        res.push(issueResponse.data[i]);
      }
    }
    setIssues(res);
  };

  useEffect(() => {
    getIssues();
  }, []);
  return (
    <div>
      {issues.map((issue) => {
        return (
          <div>
            <ProgressIssueComponent
              issue={issue}
              key={uuid.v4()}
              type={type}
            ></ProgressIssueComponent>
          </div>
        );
      })}
    </div>
  );
}
