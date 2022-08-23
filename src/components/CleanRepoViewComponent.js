import React from 'react';
import LoadingDefaultViewComponent from './LoadingDefaultViewComponent';
import UnAuthenticatedDefault from './UnAuthenticatedDefault';
import * as linkStatuses from '../helpers/linkStatuses';
import { cleanRepo } from '../helpers/cleanRepo';

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
          <button
            onClick={async () => {
              purgeRepo();
            }}
          >
            PURGE
          </button>
        </>
      )}
    </>
  );
}
