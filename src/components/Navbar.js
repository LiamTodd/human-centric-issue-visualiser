import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className="navbar">
      <h1>Navbar</h1>
      <ul>
        <li>
          <NavLink exact to="/">
            Overview
          </NavLink>
        </li>
        <li>
          <NavLink to="/list">List</NavLink>
        </li>
        <li>
          <NavLink to="/prioritise">Prioritise</NavLink>
        </li>
        <li>
          <NavLink to="/progress">Progress</NavLink>
        </li>
      </ul>
    </div>
  );
}
