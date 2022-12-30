import React from 'react';
import {Form, Button } from 'react-bootstrap';
import './SignUp.css';

function Register() {
  return (
    <div className='register container-sm'>
        <Form className='rounded-3'>
          <div className='mb-5'>
            <h1>Sign Up</h1>
          </div>
          <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="input" placeholder="Enter name" />
          </Form.Group>
          <Form.Group className="mb-3">
              <Form.Label>Last name</Form.Label>
              <Form.Control type="input" placeholder="Enter lastname" />
          </Form.Group>
          <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control type="input" placeholder="Enter username" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <div><Form.Text className='text-danger'>Error</Form.Text></div>
          <Button className='mb-3' variant="primary">
              Sign up
          </Button>
          <div>
            <Form.Text>Already have an account? <span className='text-primary'>Sign in</span></Form.Text>
          </div>
          
        </Form>
    </div>
  )
}

export default Register;