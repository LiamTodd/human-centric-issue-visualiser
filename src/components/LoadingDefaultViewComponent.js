import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';

export default function LoadingDefaultViewComponent() {
  return (
    <>
      <br></br>
      <br></br>
      <Button
        variant="primary"
        style={{
          backgroundColor: '#9AC7BF',
          borderWidth: '0px',
          color: 'black',
          fontSize: '16px',
          padding: '3px'
        }}
        disabled
      >
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        Linking to GitHub
      </Button>
    </>
  );
}
