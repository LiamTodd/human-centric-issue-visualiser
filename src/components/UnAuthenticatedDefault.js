import React from 'react';
import { NavLink } from 'react-router-dom';

export default function UnAuthenticatedDefault() {
  return (
    <>
      <br></br>
      <h3>Currently not linked to a GitHub repository!</h3>

      <NavLink exact="true" to="/">
        Click here to link to a repository
      </NavLink>
    </>
  );
}
