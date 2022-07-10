import Multiselect from 'multiselect-react-dropdown';
import React from 'react';
import * as repoLabels from '../helpers/labels';
import { ISSUES_KEY } from '../helpers/setupLocalStorage';

export default function FilterBarComponent({ setIssues }) {
  const HCIOptions = [
    { name: repoLabels.noHCIIdentifiedLabel.name, id: 0 },
    { name: repoLabels.appUsageLabel.name, id: 1 },
    { name: repoLabels.inclusivenessLabel.name, id: 2 },
    { name: repoLabels.userReactionLabel.name, id: 3 }
  ];
  const onHCISelect = (_, selectedHCI) => {
    const newIssues = JSON.parse(localStorage.getItem(ISSUES_KEY)).filter(
      (issue) => {
        return issue.HCILabels.includes(selectedHCI.name);
      }
    );
    setIssues(newIssues);
  };
  const onHCIRemove = (_, deselectedHCI) => {
    const newIssues = JSON.parse(localStorage.getItem(ISSUES_KEY)).filter(
      (issue) => {
        return !issue.HCILabels.includes(deselectedHCI.name);
      }
    );
    setIssues(newIssues);
  };
  const statusOptions = [
    { name: 'Unassigned Status', id: 0 },
    { name: repoLabels.unresolvedHCILabel.name, id: 1 },
    { name: repoLabels.resolvingHCILabel.name, id: 2 },
    { name: repoLabels.resolvedHCILabel.name, id: 3 }
  ];
  const onStatusSelect = (_, selectedStatus) => {
    const newIssues = JSON.parse(localStorage.getItem(ISSUES_KEY)).filter(
      (issue) => {
        return issue.progressTag == selectedStatus.name;
      }
    );
    setIssues(newIssues);
  };
  const onStatusRemove = (_, deselectedStatus) => {
    const newIssues = JSON.parse(localStorage.getItem(ISSUES_KEY)).filter(
      (issue) => {
        return !issue.progressTag == deselectedStatus.name;
      }
    );
    setIssues(newIssues);
  };
  return (
    <>
      <Multiselect
        options={HCIOptions} // Options to display in the dropdown
        selectedValues={[]} // Preselected value to persist in dropdown
        onSelect={onHCISelect} // Function will trigger on select event
        onRemove={onHCIRemove} // Function will trigger on remove event
        displayValue="name" // Property name to display in the dropdown options
        showCheckbox={true}
        placeholder="Filter by HCI categories"
        avoidHighlightFirstOption={true}
        showArrow={true}
      ></Multiselect>

      <Multiselect
        options={statusOptions} // Options to display in the dropdown
        selectedValues={[]} // Preselected value to persist in dropdown
        onSelect={onStatusSelect} // Function will trigger on select event
        onRemove={onStatusRemove} // Function will trigger on remove event
        displayValue="name" // Property name to display in the dropdown options
        showCheckbox={true}
        placeholder="Filter by status"
        avoidHighlightFirstOption={true}
        showArrow={true}
      ></Multiselect>
    </>
  );
}
