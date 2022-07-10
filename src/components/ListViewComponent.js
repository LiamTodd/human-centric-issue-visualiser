import React, { useState, useEffect } from 'react';
import { ISSUES_KEY } from '../helpers/setupLocalStorage';
import FilterBarComponent from './FilterBarComponent';
import IssueList from './IssueList';

export default function ListViewComponent() {
  const [issues, setIssues] = useState([]);

  const getIssues = async () => {
    setIssues(JSON.parse(localStorage.getItem(ISSUES_KEY)));
  };

  const onSelect = (_, selectedHCI) => {
    const newIssues = JSON.parse(localStorage.getItem(ISSUES_KEY)).filter(
      (issue) => {
        return issue.HCILabels.includes(selectedHCI.name);
      }
    );
    setIssues(newIssues);
  };
  const onRemove = (_, deselectedHCI) => {
    const newIssues = JSON.parse(localStorage.getItem(ISSUES_KEY)).filter(
      (issue) => {
        return !issue.HCILabels.includes(deselectedHCI.name);
      }
    );
    setIssues(newIssues);
  };

  useEffect(() => {
    getIssues();
  }, []);
  return (
    <>
      <FilterBarComponent
        issues={issues}
        onSelect={onSelect}
        onRemove={onRemove}
      ></FilterBarComponent>
      <IssueList issues={issues}></IssueList>
    </>
  );
}
