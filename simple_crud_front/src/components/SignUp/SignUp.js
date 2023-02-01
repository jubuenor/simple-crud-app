import React, { useState } from 'react';
import {Form, Button} from 'react-bootstrap';
import './SignUp.css';
import {Link} from 'react-router-dom';
import axios from 'axios';
import app from '../../app.json';
import Loading from '../Loading/Loading';
import MsgModal from '../MsgModal/MsgModal';

const {APIHOST}=app;

function Register() {
  const [name,setName]= useState("");
  const [last_name,setLast_name]= useState("");
  const [username,setUsername]= useState("");
  const [password,setPassword]= useState("");
  const [validated,setValidated] = useState(false);
  const [loading,setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [msg,setMsg]=useState("")

  const handleSubmit=(event)=>{
    const form = event.currentTarget;

    event.preventDefault();
    event.stopPropagation();

    if(form.checkValidity()===false){
      setValidated(true);
    }else{
      setLoading(true);
      axios.post(`${APIHOST}/users/register`,{
        name:name,
        last_name:last_name,
        username:username,
        password:password
      }).then((response)=>{
        if(response.data.succ){
          setMsg("User successfully created");
        }
      }).catch((error)=>{
        setMsg("Error creating user");
      }).finally(()=>{
        setLoading(false);
        setShow(true);
      })
    }
  }

  return (
    <div className='register container-sm'>
      <MsgModal show={show} handleClose={handleClose} msg={msg}></MsgModal>
      <Loading show={loading}></Loading>
      <Form className='rounded-3' noValidate validated={validated} onSubmit={handleSubmit}>
        <div className='mb-5'>
          <h1>Sign Up</h1>
        </div>
        <Form.Group className="mb-3 text-start">
            <Form.Label>Name</Form.Label>
            <Form.Control type="input" placeholder="Enter name" onChange={(event)=>setName(event.target.value)} required />
            <Form.Control.Feedback type="invalid">Please provide a valid name.</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3 text-start">
            <Form.Label>Last name</Form.Label>
            <Form.Control type="input" placeholder="Enter lastname"  onChange={(event)=>setLast_name(event.target.value)} required />
            <Form.Control.Feedback type="invalid">Please provide a valid last name.</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3 text-start">
            <Form.Label>Username</Form.Label>
            <Form.Control type="input" placeholder="Enter username"  onChange={(event)=>setUsername(event.target.value)} required />
            <Form.Control.Feedback type="invalid">Please provide a valid username.</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3 text-start" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password"  onChange={(event)=>setPassword(event.target.value)} required />
            <Form.Control.Feedback type="invalid">Please provide a valid password.</Form.Control.Feedback>
        </Form.Group>
        <Button className='mb-3 text-start' variant="primary" type='submit' >Sign up</Button>
        <div>
          <Form.Text>Already have an account? <Link to='/login' className='text-primary text-decoration-none'>Sign in</Link></Form.Text>
        </div>
        
      </Form>
    </div>
  )
}

export default Register;