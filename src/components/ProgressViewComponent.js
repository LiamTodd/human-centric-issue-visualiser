import React from 'react';
import ResolvedColumnComponent from './ResolvedColumnComponent';
import ResolvingColumnComponent from './ResolvingColumnComponent';
import UnassignedColumnComponent from './UnassignedColumnComponent';
import UnresolvedColumnComponent from './UnresolvedColumnComponent';

export default function ProgressViewComponent() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridGap: 20
      }}
    >
      <div>
        <h5>Unassigned</h5>
        <UnassignedColumnComponent></UnassignedColumnComponent>
      </div>
      <div>
        <h5>Unresolved</h5>
        <UnresolvedColumnComponent></UnresolvedColumnComponent>
      </div>
      <div>
        <h5>Resolving</h5>
        <ResolvingColumnComponent></ResolvingColumnComponent>
      </div>
      <div>
        <h5>Resolved</h5>
        <ResolvedColumnComponent></ResolvedColumnComponent>
      </div>
    </div>
  );
}
