import React from 'react';
import Alert from 'react-bootstrap/Alert';

export default function DangerAlertComponent({ message }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Alert variant={'danger'} style={{ width: '50%' }}>
        {message}
      </Alert>
    </div>
  );
}
