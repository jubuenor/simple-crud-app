import React, {useState} from 'react';
import { Form, Button } from 'react-bootstrap';
import {FaEdit, FaCheck} from 'react-icons/fa';
import {GiCancel} from 'react-icons/gi';
import DeleteAccount from './DeleteAccount/DeleteAccount';

function About({user,updateInfo}) {
    const [validated,setValidated] = useState(false);
    const [disabled,setDisabled] = useState(true);
    const [name,setName] =useState(user.name);
    const [last_name,setLast_name]=useState(user.last_name);
    const [username,setUsername]=useState(user.username);

    const handleSubmit=(event)=>{
        const form = event.currentTarget;

        event.preventDefault();
        event.stopPropagation();

        if(form.checkValidity()===false){
            setValidated(true);
        }else{
            if(name!==user.name||last_name!==user.last_name||username!==user.username){
                updateInfo({...user,name:name,last_name:last_name,username:username});
            }
            setDisabled(true);
        }
    }

  return (
    <>
    <Form className='rounded w-100' noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className='mb-3'>
            <Form.Label>Name</Form.Label>
            <Form.Control as="input" defaultValue={name} onChange={(event)=>setName(event.target.value)} disabled={disabled} required></Form.Control>
            <Form.Control.Feedback type="invalid">Please provide a valid name.</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='mb-3'>
            <Form.Label>Last name</Form.Label>
            <Form.Control as="input" defaultValue={last_name} onChange={(event)=>setLast_name(event.target.value)} disabled={disabled} required></Form.Control>
            <Form.Control.Feedback type="invalid">Please provide a valid last name.</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='mb-3'>
            <Form.Label>Username</Form.Label>
            <Form.Control as="input" defaultValue={username} onChange={(event)=>setUsername(event.target.value)} disabled={disabled} required></Form.Control>
            <Form.Control.Feedback type="invalid">Please provide a valid username.</Form.Control.Feedback>
        </Form.Group>
        {
            disabled?
            <Button className='btn-sm m-2' variant='outline-light' onClick={()=>setDisabled(false)}><FaEdit size={20}></FaEdit></Button>
            :
            <>
            <Button className='btn-sm m-2' variant='outline-success' type='submit'><FaCheck size={20}></FaCheck></Button>
            <Button className='btn-sm m-2'  variant='outline-secondary' onClick={()=>setDisabled(true)}><GiCancel size={20}></GiCancel></Button>
            </>
        }
    </Form>
    
    <DeleteAccount variant='danger' user={user}>Delete account</DeleteAccount>
    </>
    
    
  )
}

export default About;