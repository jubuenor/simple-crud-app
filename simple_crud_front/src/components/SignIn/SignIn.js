import React, {useState, useCallback} from 'react';
import {Form, Button} from 'react-bootstrap';
import './SignIn.css';
import app from '../../app.json';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { SessionTime } from '../../helper/helper';
import Loading from '../Loading/Loading';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const {APIHOST}=app;
const cookies = new Cookies();

function Login(props) {
  const navigate = useNavigate();
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [validated,setValidated] = useState(false);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");

  const goHome= useCallback(() => navigate('/home', {replace: true}), [navigate]);

  const handleSubmit=(event)=>{
    const form = event.currentTarget;

    event.preventDefault();
    event.stopPropagation();

    if(form.checkValidity()===false){
      setError("");
      setValidated(true);
    }else{
      setLoading(true);
      axios.post(`${APIHOST}/users/login`,{
      username:username,
      password:password
    }).then((response)=>{
      if(response.data.token){
        cookies.set('_s',response.data.token,{
          path:'/',
          expires: SessionTime()
        })
        props.setLogged(true);
        goHome();
      }else{
        setError("Username or password incorrect");
      }
    }).catch((validated)=>{
      setError("Error");
    }).finally(()=>{
      setLoading(false);
    })
  }
  }
  return (
    <div className='login container-sm'>
      <Loading show={loading}></Loading>
      <Form className='rounded-3' noValidate validated={validated} onSubmit={handleSubmit}>
        <div className='mb-5'>
          <h1>Sign in</h1>
        </div>
        <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control type="input" placeholder="Enter username" onChange={(event)=>setUsername(event.target.value)} required/>
            <Form.Control.Feedback type="invalid">Please provide a valid username.</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={(event)=>setPassword(event.target.value)} required/>
            <Form.Control.Feedback type="invalid">Please provide a valid password.</Form.Control.Feedback>
        </Form.Group>
        {error.length>0?<div><Form.Text className='text-danger'>{error}</Form.Text></div>:null}
        <Button className='mb-3' variant="primary" type='submit'>Sign in</Button>
        <div>
          <Form.Text>Don't have an account? <Link to='/signup' className='text-primary text-decoration-none'>Sign up</Link></Form.Text>
        </div>
        
      </Form>
    </div>
  )
}

export default Login;