import React, { useState, useEffect } from 'react';
import { ISSUES_KEY } from '../helpers/localStorageKeys';
import CorrectionIssueComponent from './CorrectionIssueComponent';
import UnAuthenticatedDefault from './UnAuthenticatedDefault';
import * as linkStatuses from '../helpers/linkStatuses';
import LoadingDefaultViewComponent from './LoadingDefaultViewComponent';

export default function ManualCorrectionViewComponent({ linkStatus }) {
  const [issues, setIssues] = useState([]);

  const getIssues = async () => {
    setIssues(JSON.parse(localStorage.getItem(ISSUES_KEY)));
  };

  useEffect(() => {
    getIssues();
  }, []);

  return (
    <>
      {linkStatus == linkStatuses.unlinkedState && (
        <UnAuthenticatedDefault></UnAuthenticatedDefault>
      )}
      {linkStatus == linkStatuses.loadingState && (
        <LoadingDefaultViewComponent></LoadingDefaultViewComponent>
      )}

      {linkStatus == linkStatuses.readyState && (
        <>
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
                  setIssues={setIssues}
                ></CorrectionIssueComponent>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}
