import React, { useState } from 'react';
import { createGitHubLabels } from '../helpers/createGitHubLabels';
import { CREDENTIALS_KEY } from '../helpers/localStorageKeys';
import { setupLocalStorage } from '../helpers/setupLocalStorage';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as linkStatuses from '../helpers/linkStatuses';
import LoadingDefaultViewComponent from './LoadingDefaultViewComponent';

export default function AuthenticateComponent({ linkStatus, setLinkStatus }) {
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

  const alertReady = () => {
    setLinkStatus(linkStatuses.loadingState);
    setTimeout(() => {
      setLinkStatus(linkStatuses.readyState);
    }, 7000); // perhaps there's a better way to do this
  };

  const authenticateAndSetUp = () => {
    localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(credentials));
    createGitHubLabels().then(() => {
      setupLocalStorage().then(() => {
        alertReady();
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
      <br></br>

      {linkStatus == linkStatuses.loadingState && (
        <LoadingDefaultViewComponent></LoadingDefaultViewComponent>
      )}
      {linkStatus == linkStatuses.readyState && (
        <h5>Successfully linked to a repository!</h5>
      )}
    </div>
  );
}
