import React, { useState } from 'react';
import { createGitHubLabels } from '../helpers/createGitHubLabels';
import { CREDENTIALS_KEY, ISSUES_KEY } from '../helpers/localStorageKeys';
import { preProcessIssues } from '../helpers/preProcessIssues';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as linkStatuses from '../helpers/linkStatuses';
import LoadingDefaultViewComponent from './LoadingDefaultViewComponent';
import DangerAlertComponent from './DangerAlertComponent';

const badCredentialsAlert = 'Invalid GitHub Credentials';
const invalidInputAlert = 'Please enter all three fields';

export default function AuthenticateComponent({ linkStatus, setLinkStatus }) {
  // for debugging
  setInterval(() => {}, 500);

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
    setTimeout(() => {
      setLinkStatus(linkStatuses.readyState);
    }, 3000); // buffer for api calls. perhaps there's a better way to do this
  };

  const [credentialAlert, setCredentialAlert] = useState('');

  const authenticateAndSetUp = () => {
    if (
      credentials.repoName == null ||
      credentials.userName == null ||
      credentials.token == null ||
      credentials.repoName.length == 0 ||
      credentials.userName.length == 0 ||
      credentials.token.length == 0
    ) {
      setCredentialAlert(
        <DangerAlertComponent
          message={invalidInputAlert}
        ></DangerAlertComponent>
      );
      return;
    }

    setLinkStatus(linkStatuses.loadingState);
    let cachedCredentials = localStorage.getItem(CREDENTIALS_KEY);

    localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(credentials));
    createGitHubLabels()
      .then(() => {
        preProcessIssues().then((processedIssues) => {
          console.log('This in LS', processedIssues); // could local storage be set here???
          localStorage.setItem(ISSUES_KEY, JSON.stringify(processedIssues));
          alertReady();
        });
        setCredentialAlert('');
      })
      .catch((e) => {
        console.log(e);
        // bug-proofind for when invalid credentials are inputted
        setLinkStatus(linkStatuses.unlinkedState);
        if (cachedCredentials != null) {
          localStorage.setItem(CREDENTIALS_KEY, cachedCredentials); // restore previous credentials
        }
        setCredentialAlert(
          <DangerAlertComponent
            message={badCredentialsAlert}
          ></DangerAlertComponent>
        );
      });
  };

  return (
    <div>
      <br></br>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label style={{ fontSize: '16px' }}>
            GitHub Repository Name
          </Form.Label>
          <br></br>
          <input
            style={{ width: '30%' }}
            type="text"
            onChange={updateRepoName}
            placeholder="Enter GitHub Repository Name"
          ></input>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label style={{ fontSize: '16px' }}>
            GitHub Repository Contributor Username
          </Form.Label>
          <br></br>
          <input
            style={{ width: '30%' }}
            type="text"
            onChange={updateUsername}
            placeholder="Enter GitHub Username of the Repository Owner"
          ></input>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label style={{ fontSize: '16px' }}>
            GitHub Access Token
          </Form.Label>
          <br></br>
          <input
            style={{ width: '30%' }}
            type="password"
            placeholder="Enter GitHub Access Token"
            onChange={updateToken}
          ></input>
          <br></br>
          <Form.Label>
            Go to Github{'>'}Settings{'>'}Developer settings{'>'}Personal access
            tokens{'>'}Generate new token{'>'}Generate token
          </Form.Label>
          <br></br>
          <Form.Label>Ensure to check the 'repo' scope</Form.Label>
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
      <div>{credentialAlert}</div>

      {linkStatus == linkStatuses.loadingState && (
        <LoadingDefaultViewComponent></LoadingDefaultViewComponent>
      )}
      {linkStatus == linkStatuses.readyState && (
        <h5>
          Successfully linked to{' '}
          {JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).repoName}!
        </h5>
      )}
    </div>
  );
}
