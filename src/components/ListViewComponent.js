import React, { useState, useEffect } from 'react';
import { ISSUES_KEY, READY_KEY } from '../helpers/localStorageKeys';
import FilterBarComponent from './FilterBarComponent';
import IssueList from './IssueList';
import UnAuthenticatedDefault from './UnAuthenticatedDefault';

export default function ListViewComponent() {
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
        <>
          <FilterBarComponent setIssues={setIssues}></FilterBarComponent>
          <p></p>
          <IssueList issues={issues}></IssueList>
        </>
      )}
    </>
  );
}
