import React,{useState} from 'react'
import axios from 'axios';
import {logout } from '../../../../helper/helper';
import { Form, Button } from 'react-bootstrap';
import app from '../../../../app.json';


const {APIHOST}=app;

function DeleteAccount(props) {
    const [show, setShow]=useState(false);
    const [password, setPassword] = useState("");
    const [validated,setValidated] = useState(false);

    const handleSubmit=(event)=>{
        const form = event.currentTarget;

        event.preventDefault();
        event.stopPropagation();

        if(form.checkValidity()===false){
            setValidated(true);
        }else{
            axios.post(`${APIHOST}/users/delete`,
            {user:props.user,inputpass:password})
            .then((response)=>{
                if(response.data.succ){
                    logout();
                }
            }).catch((error)=>{
                console.log(error)
            })
        }

    }


  return (
        show?
        <Form className='rounded-3 mt-3' noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label className='text-danger'>All your posts will be deleted</Form.Label>
                <Form.Control as='input' type='password' placeholder='Confirm your password' onChange={(event)=>setPassword(event.target.value)} required></Form.Control>
                <Form.Control.Feedback type="invalid">Please provide a valid password.</Form.Control.Feedback>
            </Form.Group>
            <Button type='submit' className='mt-5 me-3' variant='danger'>Delete</Button>
            <Button className='mt-5' variant='light' onClick={()=>setShow(false)}>Cancel</Button>
        </Form>
        :<Button className='mt-3'  variant='danger' onClick={()=>setShow(true)}>Delete account</Button>
  )
}

export default DeleteAccount;