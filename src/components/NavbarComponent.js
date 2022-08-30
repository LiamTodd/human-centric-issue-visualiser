import React from 'react';
import { NavLink } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { mainTheme } from '../theme/hexCodes';
import logo from '../logos/logo.png';

export default function NavbarComponent() {
  return (
    <div
      style={{
        borderBottom: '2px solid lightgrey',
        height: 'fit-content',
        padding: '2vh',
        marginBottom: '10px',
        backgroundColor: `#${mainTheme}`
      }}
    >
      <Container style={{ paddingLeft: '0px' }}>
        <Row>
          <Col>
            <img src={logo} style={{ height: '15vh' }}></img>
          </Col>
          <Col>
            <NavLink
              exact="true"
              to="/"
              style={({ isActive }) =>
                isActive
                  ? {
                      textDecoration: 'none',
                      color: 'black',
                      fontSize: '16px',
                      fontWeight: 'bold'
                    }
                  : {
                      textDecoration: 'none',
                      color: 'black',
                      fontSize: '12px'
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
                      fontSize: '16px',
                      fontWeight: 'bold'
                    }
                  : {
                      textDecoration: 'none',
                      color: 'black',
                      fontSize: '12px'
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
                      fontSize: '16px',
                      fontWeight: 'bold'
                    }
                  : {
                      textDecoration: 'none',
                      color: 'black',
                      fontSize: '12px'
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
                      fontSize: '16px',
                      fontWeight: 'bold'
                    }
                  : {
                      textDecoration: 'none',
                      color: 'black',
                      fontSize: '12px'
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
                      fontSize: '16px',
                      fontWeight: 'bold'
                    }
                  : {
                      textDecoration: 'none',
                      color: 'black',
                      fontSize: '12px'
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
                      fontSize: '16px',
                      fontWeight: 'bold'
                    }
                  : {
                      textDecoration: 'none',
                      color: 'black',
                      fontSize: '12px'
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
                      fontSize: '16px',
                      fontWeight: 'bold'
                    }
                  : {
                      textDecoration: 'none',
                      color: 'black',
                      fontSize: '12px'
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
