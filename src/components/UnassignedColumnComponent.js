import React, { useState, useEffect } from 'react';
import { getGitHubIssues } from '../helpers/getGitHubIssues';

const statusLabels = ['Unresolved HCI', 'Resolving HCI', 'Resolved HCI'];

export default function UnassignedColumnComponent() {
  const [issues, setIssues] = useState([]);

  const getIssues = async () => {
    const issueResponse = await getGitHubIssues();
    let res = [];
    for (let i = 0; i <= issueResponse.data.length - 1; i++) {
      const flag = true;
      const labels = issueResponse.data[i].labels;
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
  return <div>UnassignedColumnComponent</div>;
}
