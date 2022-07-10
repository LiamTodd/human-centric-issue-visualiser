import Multiselect from 'multiselect-react-dropdown';
import React from 'react';
import * as repoLabels from '../helpers/labels';

export default function FilterBarComponent({ onSelect, onRemove }) {
  const HCIOptions = [
    { name: repoLabels.noHCIIdentifiedLabel.name, id: 0 },
    { name: repoLabels.appUsageLabel.name, id: 1 },
    { name: repoLabels.inclusivenessLabel.name, id: 2 },
    { name: repoLabels.userReactionLabel.name, id: 3 }
  ];
  return (
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
  );
}
