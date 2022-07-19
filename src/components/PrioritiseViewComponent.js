import React, { useState, useEffect } from 'react';
import * as uuid from 'uuid';
import {
  lowPriorityLabel,
  mediumPriorityLabel,
  highPriorityLabel
} from '../helpers/labels';
import { ISSUES_KEY, READY_KEY } from '../helpers/localStorageKeys';
import PrioritiseIssueComponent from './PrioritiseIssueComponent';
import UnAuthenticatedDefault from './UnAuthenticatedDefault';

export default function PrioritiseViewComponent() {
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
          <div>
            <h5 style={{ backgroundColor: 'lightgrey' }}>Unassigned</h5>
            <div>
              {issues
                .filter((issue) => issue.priority.name == null)
                .map((issue) => {
                  return (
                    <div>
                      <PrioritiseIssueComponent
                        issue={issue}
                        key={uuid.v4()}
                        setIssues={setIssues}
                      ></PrioritiseIssueComponent>
                    </div>
                  );
                })}
            </div>
          </div>
          <div>
            <h5 style={{ backgroundColor: '#' + lowPriorityLabel.color }}>
              Low Priority
            </h5>
            {issues
              .filter((issue) => issue.priority.name == lowPriorityLabel.name)
              .map((issue) => {
                return (
                  <div>
                    <PrioritiseIssueComponent
                      issue={issue}
                      key={uuid.v4()}
                      setIssues={setIssues}
                    ></PrioritiseIssueComponent>
                  </div>
                );
              })}
          </div>
          <div>
            <h5 style={{ backgroundColor: '#' + mediumPriorityLabel.color }}>
              Medium Priority
            </h5>
            {issues
              .filter(
                (issue) => issue.priority.name == mediumPriorityLabel.name
              )
              .map((issue) => {
                return (
                  <div>
                    <PrioritiseIssueComponent
                      issue={issue}
                      key={uuid.v4()}
                      setIssues={setIssues}
                    ></PrioritiseIssueComponent>
                  </div>
                );
              })}
          </div>
          <div>
            <h5 style={{ backgroundColor: '#' + highPriorityLabel.color }}>
              High Priority
            </h5>
            {issues
              .filter((issue) => issue.priority.name == highPriorityLabel.name)
              .map((issue) => {
                return (
                  <div>
                    <PrioritiseIssueComponent
                      issue={issue}
                      key={uuid.v4()}
                      setIssues={setIssues}
                    ></PrioritiseIssueComponent>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
}
