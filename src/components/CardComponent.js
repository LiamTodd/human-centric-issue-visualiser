import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

export default class CardComponent extends Component {
  render() {
    const title = 'GitHub Issue Title';
    const details = 'AuthorName, 10/10/22';
    const body =
      'issue body Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,';
    const link = 'see issue';

    return (
      <div>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{details}</Card.Subtitle>
            <Card.Text>{body}</Card.Text>
            <Card.Link href="#">{link}</Card.Link>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
