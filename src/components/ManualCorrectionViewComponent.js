import React, { useState, useEffect } from 'react';
import { ISSUES_KEY, READY_KEY } from '../helpers/localStorageKeys';
import CorrectionIssueComponent from './CorrectionIssueComponent';
import UnAuthenticatedDefault from './UnAuthenticatedDefault';

export default function ManualCorrectionViewComponent() {
  const [issues, setIssues] = useState([]);

  const getIssues = async () => {
    setIssues(JSON.parse(localStorage.getItem(ISSUES_KEY)));
  };

  useEffect(() => {
    getIssues();
  }, []);

  return (
    <>
      {!JSON.parse(localStorage.getItem(READY_KEY)) && (
        <UnAuthenticatedDefault></UnAuthenticatedDefault>
      )}

      {JSON.parse(localStorage.getItem(READY_KEY)) && (
        <div
          style={{
            textAlign: 'center',
            paddingLeft: '20%',
            paddingRight: '20%'
          }}
        >
          {issues.map((issue) => {
            return (
              <CorrectionIssueComponent
                issue={issue}
              ></CorrectionIssueComponent>
            );
          })}
        </div>
      )}
    </>
  );
}
