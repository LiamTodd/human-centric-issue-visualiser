import React from 'react';
import IssueComponent from './IssueComponent';
import * as uuid from 'uuid';

export default function IssueList({ issues }) {
  return issues.map((issue) => {
    return <IssueComponent issue={issue} key={uuid.v4()}></IssueComponent>;
  });
}
