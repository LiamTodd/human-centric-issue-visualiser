import Multiselect from 'multiselect-react-dropdown';
import React from 'react';
import * as repoLabels from '../helpers/labels';
import { ISSUES_KEY } from '../helpers/setupLocalStorage';

const HCIType = 'HCI';
const statusType = 'status';

export default function FilterBarComponent({ setIssues }) {
  const options = [
    {
      name: repoLabels.noHCIIdentifiedLabel.name,
      type: HCIType,
      value: repoLabels.noHCIIdentifiedLabel.name
    },
    {
      name: repoLabels.appUsageLabel.name,
      type: HCIType,
      value: repoLabels.appUsageLabel.name
    },
    {
      name: repoLabels.inclusivenessLabel.name,
      type: HCIType,
      value: repoLabels.inclusivenessLabel.name
    },
    {
      name: repoLabels.userReactionLabel.name,
      type: HCIType,
      value: repoLabels.userReactionLabel.name
    },
    { name: 'Unassigned Status', type: statusType, value: null },
    {
      name: repoLabels.unresolvedHCILabel.name,
      type: statusType,
      value: repoLabels.unresolvedHCILabel.name
    },
    {
      name: repoLabels.resolvingHCILabel.name,
      type: statusType,
      value: repoLabels.resolvingHCILabel.name
    },
    {
      name: repoLabels.resolvedHCILabel.name,
      type: statusType,
      value: repoLabels.resolvedHCILabel.name
    }
  ];

  const updateSelected = (selectedList, selectedOption) => {
    if (selectedList.length == 0) {
      setIssues(JSON.parse(localStorage.getItem(ISSUES_KEY)));
      return;
    } else {
      const newIssues = JSON.parse(localStorage.getItem(ISSUES_KEY)).filter(
        (issue) => {
          // iterate over each selected option, return true if issue meets the criteria
          for (let i = 0; i < selectedList.length; i++) {
            if (selectedList[i].type == HCIType) {
              if (issue.HCILabels.includes(selectedList[i].value)) {
                return true;
              }
            } else if (selectedList[i].type == statusType) {
              if (issue.progressTag == selectedList[i].value) {
                return true;
              }
            }
          }
          return false;
        }
      );
      setIssues(newIssues);
    }
  };

  return (
    <>
      <Multiselect
        options={options} // Options to display in the dropdown
        selectedValues={[]} // Preselected value to persist in dropdown
        onSelect={updateSelected} // Function will trigger on select event
        onRemove={updateSelected} // Function will trigger on remove event
        displayValue="name" // Property name to display in the dropdown options
        showCheckbox={true}
        placeholder="Filter issues by..."
        avoidHighlightFirstOption={true}
        showArrow={true}
      ></Multiselect>
    </>
  );
}
