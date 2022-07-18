import React, { useState } from 'react';
import { createGitHubLabels } from '../helpers/createGitHubLabels';
import { setupLocalStorage } from '../helpers/setupLocalStorage';

const CREDENTIALS_KEY = 'credentials';

export default function AuthenticateComponent() {
  const [credentials, setCredentials] = useState({
    userName: null,
    repoName: null,
    token: null
  });

  const updateUsername = (event) => {
    let newCred = credentials;
    newCred.userName = event.target.value;
    setCredentials(newCred);
  };
  const updateRepoName = (event) => {
    let newCred = credentials;
    newCred.repoName = event.target.value;
    setCredentials(newCred);
  };
  const updateToken = (event) => {
    let newCred = credentials;
    newCred.token = event.target.value;
    setCredentials(newCred);
  };

  const authenticateAndSetUp = () => {
    localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(credentials));
    createGitHubLabels().then(() => {
      setupLocalStorage();
    });
  };

  return (
    <div>
      <div style={{ textAlign: 'left' }}>
        <div>
          <label for="username">GitHub Username:</label>
          <input
            type="text"
            // value={credentials.username}
            onChange={updateUsername}
          ></input>
        </div>

        <div>
          <label for="repo">GitHub Repository Name:</label>
          <input
            type="text"
            // value={credentials.repoName}
            onChange={updateRepoName}
          ></input>
        </div>

        <div>
          <label for="token">GitHub Access Token:</label>
          <input
            type="text"
            // value={credentials.token}
            onChange={updateToken}
          ></input>
        </div>

        <input
          type="submit"
          value="Submit"
          onClick={() => {
            authenticateAndSetUp();
          }}
        ></input>
      </div>
    </div>
  );
}
