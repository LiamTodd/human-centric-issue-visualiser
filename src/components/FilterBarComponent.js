import Multiselect from 'multiselect-react-dropdown';
import React from 'react';
import * as repoLabels from '../helpers/labels';
import { ISSUES_KEY } from '../helpers/setupLocalStorage';

const HCIType = 'HCI';
const statusType = 'status';

export default function FilterBarComponent({ setIssues }) {
  const options = [
    { name: repoLabels.noHCIIdentifiedLabel.name, type: HCIType },
    { name: repoLabels.appUsageLabel.name, type: HCIType },
    { name: repoLabels.inclusivenessLabel.name, type: HCIType },
    { name: repoLabels.userReactionLabel.name, type: HCIType },
    { name: 'Unassigned Status', type: statusType },
    { name: repoLabels.unresolvedHCILabel.name, type: statusType },
    { name: repoLabels.resolvingHCILabel.name, type: statusType },
    { name: repoLabels.resolvedHCILabel.name, type: statusType }
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
              if (issue.HCILabels.includes(selectedList[i].name)) {
                return true;
              }
            } else if (selectedList[i].type == statusType) {
              if (issue.progressTag == selectedList[i].name) {
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
        placeholder="Filter"
        avoidHighlightFirstOption={true}
        showArrow={true}
      ></Multiselect>
    </>
  );
}
