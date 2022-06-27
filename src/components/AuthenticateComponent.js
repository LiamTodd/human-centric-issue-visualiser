import React from 'react';

export default function AuthenticateComponent() {
  return (
    <div style={{ textAlign: 'left' }}>
      <div>
        <label for="username">GitHub Username:</label>
        <input type="text" id="username" name="username"></input>
      </div>

      <div>
        <label for="repo">GitHub Repository Name:</label>
        <input type="text" id="repo" name="repo"></input>
      </div>

      <div>
        <label for="token">GitHub Access Token:</label>
        <input type="text" id="token" name="token"></input>
      </div>

      <input type="submit" value="Submit"></input>
    </div>
  );
}
