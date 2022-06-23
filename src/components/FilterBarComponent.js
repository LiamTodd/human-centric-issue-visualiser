import React, { Component } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import DropdownComponent from './DropdownComponent.js';

export default class FilterBarComponent extends Component {
  render() {
    return (
      <div>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <DropdownComponent />
                <DropdownComponent />
                <DropdownComponent />
                <DropdownComponent />
                <DropdownComponent />
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}
