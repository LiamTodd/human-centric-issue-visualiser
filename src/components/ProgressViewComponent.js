import React, { useState, useEffect } from 'react';
import * as uuid from 'uuid';
import ProgressIssueComponent from './ProgressIssueComponent';
import {
  resolvedHCILabel,
  resolvingHCILabel,
  unresolvedHCILabel
} from '../helpers/labels';
import UnAuthenticatedDefault from './UnAuthenticatedDefault';
import { ISSUES_KEY, READY_KEY } from '../helpers/localStorageKeys';

export default function ProgressViewComponent() {
  const [issues, setIssues] = useState([]);

  const getIssues = async () => {
    setIssues(JSON.parse(localStorage.getItem(ISSUES_KEY)));
  };

  useEffect(() => {
    getIssues();
  }, []);

  return (
    <>
      {!JSON.parse(localStorage.getItem(READY_KEY)) && (
        <UnAuthenticatedDefault></UnAuthenticatedDefault>
      )}
      {JSON.parse(localStorage.getItem(READY_KEY)) && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridGap: 20
          }}
        >
          <div
            style={{
              backgroundColor: '#E6E6E6',
              padding: '10px',
              borderRadius: '10px'
            }}
          >
            <h5>Unassigned</h5>
            <div>
              {issues
                .filter((issue) => issue.progressTag.name == null)
                .map((issue) => {
                  return (
                    <div>
                      <ProgressIssueComponent
                        issue={issue}
                        key={uuid.v4()}
                        setIssues={setIssues}
                      ></ProgressIssueComponent>
                      <br></br>
                    </div>
                  );
                })}
            </div>
          </div>
          <div
            style={{
              backgroundColor: '#E6E6E6',
              padding: '10px',
              borderRadius: '10px'
            }}
          >
            <h5>Unresolved</h5>
            {issues
              .filter(
                (issue) => issue.progressTag.name == unresolvedHCILabel.name
              )
              .map((issue) => {
                return (
                  <div>
                    <ProgressIssueComponent
                      issue={issue}
                      key={uuid.v4()}
                      setIssues={setIssues}
                    ></ProgressIssueComponent>
                    <br></br>
                  </div>
                );
              })}
          </div>
          <div
            style={{
              backgroundColor: '#E6E6E6',
              padding: '10px',
              borderRadius: '10px'
            }}
          >
            <h5>Resolving</h5>
            {issues
              .filter(
                (issue) => issue.progressTag.name == resolvingHCILabel.name
              )
              .map((issue) => {
                return (
                  <div>
                    <ProgressIssueComponent
                      issue={issue}
                      key={uuid.v4()}
                      setIssues={setIssues}
                    ></ProgressIssueComponent>
                    <br></br>
                  </div>
                );
              })}
          </div>
          <div
            style={{
              backgroundColor: '#E6E6E6',
              padding: '10px',
              borderRadius: '10px'
            }}
          >
            <h5>Resolved</h5>
            {issues
              .filter(
                (issue) => issue.progressTag.name == resolvedHCILabel.name
              )
              .map((issue) => {
                return (
                  <div>
                    <ProgressIssueComponent
                      issue={issue}
                      key={uuid.v4()}
                      setIssues={setIssues}
                    ></ProgressIssueComponent>
                    <br></br>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
}
