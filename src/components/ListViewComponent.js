import React from 'react';
import FilterBarComponent from './FilterBarComponent';
import IssueList from './IssueList';

export default function ListViewComponent() {
  return (
    <div>
      <FilterBarComponent></FilterBarComponent>
      <IssueList></IssueList>
    </div>
  );
}
