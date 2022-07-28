import React, { useState, useEffect } from 'react';
import * as uuid from 'uuid';
import {
  lowPriorityLabel,
  mediumPriorityLabel,
  highPriorityLabel
} from '../helpers/labels';
import { ISSUES_KEY } from '../helpers/localStorageKeys';
import PrioritiseIssueComponent from './PrioritiseIssueComponent';
import UnAuthenticatedDefault from './UnAuthenticatedDefault';
import * as linkStatuses from '../helpers/linkStatuses';
import LoadingDefaultViewComponent from './LoadingDefaultViewComponent';

export default function PrioritiseViewComponent({ linkStatus }) {
  const [issues, setIssues] = useState([]);

  const getIssues = async () => {
    setIssues(JSON.parse(localStorage.getItem(ISSUES_KEY)));
  };

  useEffect(() => {
    getIssues();
  }, []);

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
              <h5
                style={{ backgroundColor: 'lightgrey', borderRadius: '10px' }}
              >
                Unassigned
              </h5>
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
                        <br></br>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div
              style={{
                backgroundColor: '#' + lowPriorityLabel.color + '40',
                padding: '10px',
                borderRadius: '10px'
              }}
            >
              <h5
                style={{
                  backgroundColor: '#' + lowPriorityLabel.color,
                  borderRadius: '10px'
                }}
              >
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
                      <br></br>
                    </div>
                  );
                })}
            </div>
            <div
              style={{
                backgroundColor: '#' + mediumPriorityLabel.color + '60',
                padding: '10px',
                borderRadius: '10px'
              }}
            >
              <h5
                style={{
                  backgroundColor: '#' + mediumPriorityLabel.color,
                  borderRadius: '10px'
                }}
              >
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
                      <br></br>
                    </div>
                  );
                })}
            </div>
            <div
              style={{
                backgroundColor: '#' + highPriorityLabel.color + '60',
                padding: '10px',
                borderRadius: '10px'
              }}
            >
              <h5
                style={{
                  backgroundColor: '#' + highPriorityLabel.color,
                  borderRadius: '10px'
                }}
              >
                High Priority
              </h5>
              {issues
                .filter(
                  (issue) => issue.priority.name == highPriorityLabel.name
                )
                .map((issue) => {
                  return (
                    <div>
                      <PrioritiseIssueComponent
                        issue={issue}
                        key={uuid.v4()}
                        setIssues={setIssues}
                      ></PrioritiseIssueComponent>
                      <br></br>
                    </div>
                  );
                })}
            </div>
          </div>
        </>
      )}
    </>
  );
}
