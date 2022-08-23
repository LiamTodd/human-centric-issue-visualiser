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
              style={({ isActive }) =>
                isActive
                  ? {
                      textDecoration: 'none',
                      color: 'black',
                      fontSize: '20px',
                      fontWeight: 'bold'
                    }
                  : {
                      textDecoration: 'none',
                      color: 'black',
                      fontSize: '20px'
                    }
              }
            >
              Link Repository
            </NavLink>
          </Col>
          <Col>
            <NavLink
              to="/overview"
              style={({ isActive }) =>
                isActive
                  ? {
                      textDecoration: 'none',
                      color: 'black',
                      fontSize: '20px',
                      fontWeight: 'bold'
                    }
                  : {
                      textDecoration: 'none',
                      color: 'black',
                      fontSize: '20px'
                    }
              }
            >
              Overview
            </NavLink>
          </Col>
          <Col>
            <NavLink
              to="/list"
              style={({ isActive }) =>
                isActive
                  ? {
                      textDecoration: 'none',
                      color: 'black',
                      fontSize: '20px',
                      fontWeight: 'bold'
                    }
                  : {
                      textDecoration: 'none',
                      color: 'black',
                      fontSize: '20px'
                    }
              }
            >
              List
            </NavLink>
          </Col>
          <Col>
            <NavLink
              to="/prioritise"
              style={({ isActive }) =>
                isActive
                  ? {
                      textDecoration: 'none',
                      color: 'black',
                      fontSize: '20px',
                      fontWeight: 'bold'
                    }
                  : {
                      textDecoration: 'none',
                      color: 'black',
                      fontSize: '20px'
                    }
              }
            >
              Prioritise
            </NavLink>
          </Col>
          <Col>
            <NavLink
              to="/progress"
              style={({ isActive }) =>
                isActive
                  ? {
                      textDecoration: 'none',
                      color: 'black',
                      fontSize: '20px',
                      fontWeight: 'bold'
                    }
                  : {
                      textDecoration: 'none',
                      color: 'black',
                      fontSize: '20px'
                    }
              }
            >
              Progress
            </NavLink>
          </Col>
          <Col>
            <NavLink
              to="/correction"
              style={({ isActive }) =>
                isActive
                  ? {
                      textDecoration: 'none',
                      color: 'black',
                      fontSize: '20px',
                      fontWeight: 'bold'
                    }
                  : {
                      textDecoration: 'none',
                      color: 'black',
                      fontSize: '20px'
                    }
              }
            >
              Correction Tool
            </NavLink>
          </Col>
          <Col>
            <NavLink
              to="/clear"
              style={({ isActive }) =>
                isActive
                  ? {
                      textDecoration: 'none',
                      color: 'black',
                      fontSize: '20px',
                      fontWeight: 'bold'
                    }
                  : {
                      textDecoration: 'none',
                      color: 'black',
                      fontSize: '20px'
                    }
              }
            >
              Reset Repo
            </NavLink>
          </Col>
        </Row>
      </Container>
    </div>
  );
}