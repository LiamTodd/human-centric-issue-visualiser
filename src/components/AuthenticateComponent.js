import React, { useState } from 'react';
import { createGitHubLabels } from '../helpers/createGitHubLabels';
import { CREDENTIALS_KEY, READY_KEY } from '../helpers/localStorageKeys';
import { setupLocalStorage } from '../helpers/setupLocalStorage';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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
      <br></br>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>GitHub Repository Name</Form.Label>
          <br></br>
          <input
            style={{ width: '30%' }}
            type="text"
            onChange={updateRepoName}
            placeholder="Enter GitHub Repository Name"
          ></input>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>GitHub Repository Owner</Form.Label>
          <br></br>
          <input
            style={{ width: '30%' }}
            type="text"
            onChange={updateUsername}
            placeholder="Enter GitHub Username of the Repository Owner"
          ></input>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>GitHub Access Token</Form.Label>
          <br></br>
          <input
            style={{ width: '30%' }}
            type="password"
            placeholder="Enter GitHub Access Token"
            onChange={updateToken}
          ></input>
        </Form.Group>
        <Button
          variant="outline-secondary"
          // type="submit"
          onClick={() => {
            authenticateAndSetUp();
          }}
        >
          Link to Repository
        </Button>
      </Form>
    </div>
  );
}
