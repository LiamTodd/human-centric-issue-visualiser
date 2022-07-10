import IssueComponent from './IssueComponent';
import * as uuid from 'uuid';

export default function IssueList({ issues }) {
  return (
    <>
      <div
        style={{
          textAlign: 'center',
          paddingLeft: '20%',
          paddingRight: '20%'
        }}
      >
        {issues.map((issue) => {
          return (
            <>
              <IssueComponent issue={issue} key={uuid.v4()}></IssueComponent>
            </>
          );
        })}
      </div>
    </>
  );
}
