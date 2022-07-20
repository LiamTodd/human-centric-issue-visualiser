import React from 'react';
import { NavLink } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function NavbarComponent() {
  return (
    <div
      style={{
        borderBottom: '2px solid lightgrey',
        height: 'fit-content',
        padding: '3vh',
        marginBottom: '10px',
        backgroundColor: '#9AC7BF'
      }}
    >
      <Container>
        <Row>
          <Col>
            <NavLink
              exact="true"
              to="/"
              style={{
                textDecoration: 'none',
                color: 'black',
                fontSize: '24px'
              }}
            >
              Link Repository
            </NavLink>
          </Col>
          <Col>
            <NavLink
              to="/overview"
              style={{
                textDecoration: 'none',
                color: 'black',
                fontSize: '24px'
              }}
            >
              Overview
            </NavLink>
          </Col>
          <Col>
            <NavLink
              to="/list"
              style={{
                textDecoration: 'none',
                color: 'black',
                fontSize: '24px'
              }}
            >
              List
            </NavLink>
          </Col>
          <Col>
            <NavLink
              to="/prioritise"
              style={{
                textDecoration: 'none',
                color: 'black',
                fontSize: '24px'
              }}
            >
              Prioritise
            </NavLink>
          </Col>
          <Col>
            <NavLink
              to="/progress"
              style={{
                textDecoration: 'none',
                color: 'black',
                fontSize: '24px'
              }}
            >
              Progress
            </NavLink>
          </Col>
          <Col>
            <NavLink
              to="/correction"
              style={{
                textDecoration: 'none',
                color: 'black',
                fontSize: '24px'
              }}
            >
              Correction Tool
            </NavLink>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
