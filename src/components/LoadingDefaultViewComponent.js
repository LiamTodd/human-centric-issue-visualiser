import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import { mainTheme } from '../theme/hexCodes';

export default function LoadingDefaultViewComponent() {
  return (
    <>
      <br></br>
      <br></br>
      <Button
        variant="primary"
        style={{
          backgroundColor: `#${mainTheme}`,
          borderWidth: '0px',
          color: 'black',
          fontSize: '20px',
          padding: '10px'
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
        <div>Linking to GitHub...</div>
      </Button>
    </>
  );
}
