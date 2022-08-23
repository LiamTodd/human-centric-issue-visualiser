import React from 'react';
import LoadingDefaultViewComponent from './LoadingDefaultViewComponent';
import UnAuthenticatedDefault from './UnAuthenticatedDefault';
import * as linkStatuses from '../helpers/linkStatuses';
import { cleanRepo } from '../helpers/cleanRepo';
import Button from 'react-bootstrap/Button';
import { CREDENTIALS_KEY } from '../helpers/localStorageKeys';

export default function CleanRepoViewComponent({ linkStatus, setLinkStatus }) {
  const purgeRepo = async () => {
    setLinkStatus(linkStatuses.unlinkedState);
    cleanRepo();
    return;
  };
  return (
    <>
      {linkStatus == linkStatuses.unlinkedState && (
        <UnAuthenticatedDefault></UnAuthenticatedDefault>
      )}

      {linkStatus == linkStatuses.loadingState && (
        <LoadingDefaultViewComponent></LoadingDefaultViewComponent>
      )}

      {linkStatus == linkStatuses.readyState && (
        <>
          <p>
            Clicking this button will remove all labels added to the issues in
            the GitHub repository by this app, and will delete said labels from
            the repo entirely.
            <br></br>
            You can use this app with the repository again by simply entering
            the repo's credentials again.
          </p>
          <Button
            variant="outline-danger"
            onClick={async () => {
              purgeRepo();
            }}
          >
            Undo Changes to{' '}
            {JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).repoName}
          </Button>
        </>
      )}
    </>
  );
}
