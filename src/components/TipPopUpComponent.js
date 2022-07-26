import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import {
  appUsageLabel,
  inclusivenessLabel,
  noHCIIdentifiedLabel,
  userReactionLabel
} from '../helpers/labels';

export default function TipPopUpComponent() {
  const allHCILabels = [
    appUsageLabel,
    userReactionLabel,
    inclusivenessLabel,
    noHCIIdentifiedLabel
  ];
  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3" style={{ backgroundColor: '#9AC7BF' }}>
        Human Centric Issue Categories
      </Popover.Header>
      <Popover.Body>
        <div style={{}}>
          {allHCILabels.map((label) => {
            return (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div
                  style={{
                    borderRadius: '100%',
                    height: '4vh',
                    width: '4vh',
                    borderColor: 'grey',
                    padding: '10px',
                    margin: '0.2%',
                    backgroundColor: '#' + label.color + '80'
                  }}
                ></div>
                <div style={{ fontSize: '16px' }}>{label.name}</div>
                <br></br>
              </div>
            );
          })}
        </div>
      </Popover.Body>
    </Popover>
  );

  return (
    <OverlayTrigger trigger="click" placement="top" overlay={popover}>
      <button
        style={{
          borderRadius: '100%',
          width: '10vh',
          height: '10vh',
          borderWidth: '0px',
          fontSize: '30px',
          backgroundColor: '#9AC7BF'
        }}
      >
        ?
      </button>
    </OverlayTrigger>
  );
}
