import IssueComponent from './IssueComponent';
import * as uuid from 'uuid';
import TipPopUpComponent from './TipPopUpComponent';

export default function IssueList({ issues }) {
  return (
    <>
      <div style={{ position: 'fixed', bottom: '5%', right: '5%' }}>
        <TipPopUpComponent></TipPopUpComponent>
      </div>

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
