import React, { useState, useEffect } from 'react';
import { getGitHubIssues } from '../helpers/getGitHubIssues';
import ProgressIssueComponent from './ProgressIssueComponent';
import * as uuid from 'uuid';

const resolvingLabel = 'Resolving HCI';
const type = 'Resolving';

export default function ResolvingColumnComponent() {
  const [issues, setIssues] = useState([]);

  const getIssues = async () => {
    const issueResponse = await getGitHubIssues();
    let res = [];
    for (let i = 0; i <= issueResponse.data.length - 1; i++) {
      const labels = issueResponse.data[i].labels.map((label) => {
        return label.name;
      });
      if (labels.includes(resolvingLabel)) {
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
          <ProgressIssueComponent
            issue={issue}
            key={uuid.v4()}
            type={type}
          ></ProgressIssueComponent>
        );
      })}
    </div>
  );
}
