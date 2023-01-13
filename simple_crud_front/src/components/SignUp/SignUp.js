import React, { useState } from 'react';
import {Form, Button,  Modal } from 'react-bootstrap';
import './SignUp.css';
import {Link} from 'react-router-dom';
import axios from 'axios';
import app from '../../app.json';
import Loading from '../Loading/Loading';

const {APIHOST}=app;

function MsgModal({show,handleClose,msg}){
  return(
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{msg}</Modal.Title>
      </Modal.Header>
    </Modal>
  )
}
function Register() {
  const [name,setName]= useState("");
  const [last_name,setLast_name]= useState("");
  const [username,setUsername]= useState("");
  const [password,setPassword]= useState("");
  const [error,setError] = useState(false);
  const [loading,setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [msg,setMsg]=useState("")

  const signUp=()=>{
    if(name !=="" && last_name !== "" && username !== "" && password !== ""){
      setLoading(true);
      axios.post(`${APIHOST}/users/register`,{
        name:name,
        last_name:last_name,
        username:username,
        password:password
      }).then((response)=>{
        if(!response.data.succ){
          setError(true)
        }else{
          setMsg("User successfully created");
        }
      }).catch((error)=>{
        setError(true);
        setMsg("Error creating user");
      }).finally(()=>{
        setLoading(false);
        setShow(true);
      })
    }else{
      setError(true);
    }
    
  }

  return (
    <div className='register container-sm'>
      <MsgModal show={show} handleClose={handleClose} msg={msg}></MsgModal>
      <Loading show={loading}></Loading>
      <Form className='rounded-3'>
        <div className='mb-5'>
          <h1>Sign Up</h1>
        </div>
        <Form.Group className="mb-3 text-start">
            <Form.Label>Name</Form.Label>
            <Form.Control type="input" placeholder="Enter name" onChange={(event)=>setName(event.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3 text-start">
            <Form.Label>Last name</Form.Label>
            <Form.Control type="input" placeholder="Enter lastname"  onChange={(event)=>setLast_name(event.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3 text-start">
            <Form.Label>Username</Form.Label>
            <Form.Control type="input" placeholder="Enter username"  onChange={(event)=>setUsername(event.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3 text-start" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password"  onChange={(event)=>setPassword(event.target.value)} />
        </Form.Group>
        {error?<div><Form.Text className='text-danger'>Error</Form.Text></div>:null}
        <Button className='mb-3 text-start' variant="primary" onClick={signUp}>Sign up</Button>
        <div>
          <Form.Text>Already have an account? <Link to='/login' className='text-primary text-decoration-none'>Sign in</Link></Form.Text>
        </div>
        
      </Form>
    </div>
  )
}

export default Register;