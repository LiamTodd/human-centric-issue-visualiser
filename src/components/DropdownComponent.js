import React, { Component } from 'react';
import { NavDropdown } from 'react-bootstrap';
import CheckedButtonComponent from './CheckedButtonComponent';

export default class DropdownComponent extends Component {
  render() {
    const label = 'check';

    return (
      <div>
        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">
            Option 1
            <CheckedButtonComponent label={label}></CheckedButtonComponent>
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.2">
            Option 2
            <CheckedButtonComponent label={label}></CheckedButtonComponent>
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.3">
            Option 3
            <CheckedButtonComponent label={label}></CheckedButtonComponent>
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">
            Option 4
            <CheckedButtonComponent label={label}></CheckedButtonComponent>
          </NavDropdown.Item>
        </NavDropdown>
      </div>
    );
  }
}
