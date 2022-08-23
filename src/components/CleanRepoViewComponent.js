import React from 'react';
import LoadingDefaultViewComponent from './LoadingDefaultViewComponent';
import UnAuthenticatedDefault from './UnAuthenticatedDefault';
import * as linkStatuses from '../helpers/linkStatuses';

export default function CleanRepoViewComponent({ linkStatus }) {
  return (
    <>
      {linkStatus == linkStatuses.unlinkedState && (
        <UnAuthenticatedDefault></UnAuthenticatedDefault>
      )}

      {linkStatus == linkStatuses.loadingState && (
        <LoadingDefaultViewComponent></LoadingDefaultViewComponent>
      )}

      {linkStatus == linkStatuses.readyState && <>Hello Wurld</>}
    </>
  );
}
