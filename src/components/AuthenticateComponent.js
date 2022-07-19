import React, { useState } from 'react';
import { createGitHubLabels } from '../helpers/createGitHubLabels';
import { CREDENTIALS_KEY } from '../helpers/localStorageKeys';
import { setupLocalStorage } from '../helpers/setupLocalStorage';

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
      setupLocalStorage().then(() => {
        // a flag to tell other Views that LS is ready
        localStorage.setItem(READY_KEY, true);
      });
    });
  };

  return (
    <div>
      <div style={{ textAlign: 'left' }}>
        <div>
          <label for="username">GitHub Username:</label>
          <input type="text" onChange={updateUsername}></input>
        </div>

        <div>
          <label for="repo">GitHub Repository Name:</label>
          <input type="text" onChange={updateRepoName}></input>
        </div>

        <div>
          <label for="token">GitHub Access Token:</label>
          <input type="password" onChange={updateToken}></input>
        </div>

        <input
          type="submit"
          value="Link to repository"
          onClick={() => {
            authenticateAndSetUp();
          }}
        ></input>
      </div>
    </div>
  );
}
