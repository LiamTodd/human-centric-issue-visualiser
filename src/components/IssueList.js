import React, { useEffect, useState } from 'react';
import IssueComponent from './IssueComponent';
import * as uuid from 'uuid';
import { ISSUES_KEY } from '../helpers/setupLocalStorage';

export default function IssueList() {
  const [issues, setIssues] = useState([]);

  const getIssues = async () => {
    setIssues(JSON.parse(localStorage.getItem(ISSUES_KEY)));
  };

  useEffect(() => {
    getIssues();
    console.log(issues);
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
        return (
          <>
            <IssueComponent issue={issue} key={uuid.v4()}></IssueComponent>
          </>
        );
      })}
    </div>
  );
}
