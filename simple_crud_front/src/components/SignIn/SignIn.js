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
  const [error,setError] = useState(false);
  const [loading,setLoading] = useState(false);

  const goHome= useCallback(() => navigate('/home', {replace: true}), [navigate]);

  const signIn=()=>{
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
        setError(true);
      }
    }).catch((error)=>{
      console.log(error)
      setError(true);
    }).finally(()=>{
      setLoading(false);
    })
  }
  return (
    <div className='login container-sm'>
      <Loading show={loading}></Loading>
      <Form className='rounded-3'>
        <div className='mb-5'>
          <h1>Sign in</h1>
        </div>
        <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control type="input" placeholder="Enter username" onChange={(event)=>setUsername(event.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={(event)=>setPassword(event.target.value)} />
        </Form.Group>
        {error?<div><Form.Text className='text-danger'>Error</Form.Text></div>:null}
        <Button className='mb-3' variant="primary" onClick={signIn}>Sign in</Button>
        <div>
          <Form.Text>Don't have an account? <Link to='/signup' className='text-primary text-decoration-none'>Sign up</Link></Form.Text>
        </div>
        
      </Form>
    </div>
  )
}

export default Login;