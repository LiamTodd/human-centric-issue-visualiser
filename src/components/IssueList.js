import React, { useEffect, useState } from 'react';
import IssueComponent from './IssueComponent';
import * as uuid from 'uuid';
import { getGitHubIssues } from '../helpers/getGitHubIssues';

export default function IssueList() {
  const [issues, setIssues] = useState([]);

  const getIssues = async () => {
    const issueResponse = await getGitHubIssues();
    let res = [];
    for (let i = 0; i <= issueResponse.data.length - 1; i++) {
      res.push(issueResponse.data[i]);
    }
    setIssues(res);
  };

  useEffect(() => {
    getIssues();
  }, []);

  return (
    <div
      style={{
        textAlign: 'center',
        paddingLeft: '20%',
        paddingRight: '20%'
      }}
    >
      {issues.map((issue) => {
        return <IssueComponent issue={issue} key={uuid.v4()}></IssueComponent>;
      })}
    </div>
  );
}
