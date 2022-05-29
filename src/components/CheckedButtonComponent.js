import { useState } from 'react';
import { ToggleButton } from 'react-bootstrap';

function CheckedButtonComponent(props) {
  const [checked, setChecked] = useState(false);

  return (
    <ToggleButton
      id="toggle-check"
      type="checkbox"
      variant="outline-primary"
      checked={checked}
      value="1"
      onChange={(e) => setChecked(e.currentTarget.checked)}
    >
      {props.label}
    </ToggleButton>
  );
}

export default CheckedButtonComponent;
