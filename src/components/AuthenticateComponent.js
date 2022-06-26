import React from 'react';

export default function AuthenticateComponent() {
  return (
    <>
      <label for="fname">First name:</label>
      <input type="text" id="fname" name="fname<"></input>
      <label for="lname">Last name:</label>
      <input type="text" id="lname" name="lname"></input>
      <input type="submit" value="Submit"></input>
    </>
  );
}
