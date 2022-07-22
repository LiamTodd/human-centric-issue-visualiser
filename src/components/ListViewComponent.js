import React, { useState, useEffect } from 'react';
import { ISSUES_KEY } from '../helpers/localStorageKeys';
import FilterBarComponent from './FilterBarComponent';
import IssueList from './IssueList';
import UnAuthenticatedDefault from './UnAuthenticatedDefault';
import * as linkStatuses from '../helpers/linkStatuses';
import LoadingDefaultViewComponent from './LoadingDefaultViewComponent';

export default function ListViewComponent({ linkStatus }) {
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
          <FilterBarComponent setIssues={setIssues}></FilterBarComponent>
          <p></p>
          <IssueList issues={issues}></IssueList>
        </>
      )}
    </>
  );
}
