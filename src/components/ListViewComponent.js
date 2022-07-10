import React, { useState, useEffect } from 'react';
import { ISSUES_KEY } from '../helpers/setupLocalStorage';
import FilterBarComponent from './FilterBarComponent';
import IssueList from './IssueList';

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
      <FilterBarComponent setIssues={setIssues}></FilterBarComponent>
      <p></p>
      <IssueList issues={issues}></IssueList>
    </>
  );
}
