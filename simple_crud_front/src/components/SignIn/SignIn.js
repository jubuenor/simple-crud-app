import React from 'react';
import {Form, Button} from 'react-bootstrap';
import './SignIn.css';

function Login() {
  return (
    <div className='login container-sm'>
        <Form className='rounded-3'>
          <div className='mb-5'>
            <h1>Sign in</h1>
          </div>
          
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
              Sign in
          </Button>
          <div>
            <Form.Text>Don't have an account? <span className='text-primary'>Sign up</span></Form.Text>
          </div>
          
        </Form>
    </div>
  )
}

export default Login;