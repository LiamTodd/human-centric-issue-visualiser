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
  const extendedDescriptions = [
    appUsageLabel.description +
      'This category consists of Resource Usage, Buginess, Change & Update, UI & UX, Privacy & Security, Usage Instruction, Access Issues, and Others.',
    userReactionLabel.description +
      'We further divide this into Fulfilling interests, Emotional aspects, Preference, and Others.',
    inclusivenessLabel.description +
      'It includes issues related to the age, gender, and socioeconomic status of the users. We categorise Inclusiveness into five different subcategories, as: Compatibility, Location, Language, Accessibility, and Others.',
    ''
  ];
  const popover = (
    <Popover id="popover-basic" style={{ maxWidth: '70vw' }}>
      <Popover.Header as="h3" style={{ backgroundColor: '#9AC7BF' }}>
        Human Centric Issue Categories
      </Popover.Header>
      <Popover.Body>
        <div style={{}}>
          {allHCILabels.map((label, i) => {
            return (
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'left'
                  }}
                >
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
                  <div style={{ fontSize: '20px', paddingLeft: '20px' }}>
                    {label.name}
                  </div>
                </div>
                <br></br>
                <p style={{ fontSize: '16px' }}>{extendedDescriptions[i]}</p>
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
