import React, { useEffect, useState } from 'react';
import IssueComponent from './IssueComponent';
import * as uuid from 'uuid';
import { ISSUES_KEY } from '../helpers/setupLocalStorage';
import Multiselect from 'multiselect-react-dropdown';
import * as repoLabels from '../helpers/labels';

export default function IssueList() {
  const [issues, setIssues] = useState([]);

  const getIssues = async () => {
    setIssues(JSON.parse(localStorage.getItem(ISSUES_KEY)));
  };

  useEffect(() => {
    getIssues();
  }, []);

  const HCIOptions = [
    { name: repoLabels.noHCIIdentifiedLabel.name, id: 0 },
    { name: repoLabels.appUsageLabel.name, id: 1 },
    { name: repoLabels.inclusivenessLabel.name, id: 2 },
    { name: repoLabels.userReactionLabel.name, id: 3 }
  ];
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

  return (
    <>
      <Multiselect
        options={HCIOptions} // Options to display in the dropdown
        selectedValues={[]} // Preselected value to persist in dropdown
        onSelect={onSelect} // Function will trigger on select event
        onRemove={onRemove} // Function will trigger on remove event
        displayValue="name" // Property name to display in the dropdown options
        showCheckbox={true}
        placeholder="Filter by HCI categories"
        avoidHighlightFirstOption={true}
        showArrow={true}
      ></Multiselect>
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
    </>
  );
}
