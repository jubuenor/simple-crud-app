import React from 'react';
import { Container, Card, Button} from 'react-bootstrap'
import './Menu.css';

function Menu() {
  return (
    <div className='menu d-flex flex-column justify-content-center'>
      <Card bg='secondary' border='primary'>
        <Card.Header>Featured</Card.Header>
        <Card.Body>
            <Card.Title>Special title treatment</Card.Title>
            <Card.Text>
            With supporting text below as a natural lead-in to additional content.
            </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button variant="primary">Go somewhere</Button>
        </Card.Footer>
      </Card>

      <Card bg='secondary' border='primary'>
        <Card.Header>Featured</Card.Header>
        <Card.Body>
            <Card.Title>Special title treatment</Card.Title>
            <Card.Text>
            With supporting text below as a natural lead-in to additional content.
            </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button variant="primary">Go somewhere</Button>
        </Card.Footer>
      </Card>

    </div>
  )
}

export default Menu;