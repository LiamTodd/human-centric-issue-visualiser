import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <div
      className="navbar"
      style={{ width: '100%', fontSize: '24px', padding: '20px' }}
    >
      <NavLink exact="true" to="/">
        Overview
      </NavLink>
      <NavLink to="/list">List</NavLink>
      <NavLink to="/prioritise">Prioritise</NavLink>
      <NavLink to="/progress">Progress</NavLink>
    </div>
  );
}
