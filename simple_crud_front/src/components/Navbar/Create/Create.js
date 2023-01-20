import React, {useState, useEffect} from 'react';
import './Create.css';
import { Modal, Button, Form, ButtonGroup } from 'react-bootstrap'
import { FaSmile, FaSurprise, FaGrinHearts, FaGrinTears, FaFrown, FaMapMarkerAlt } from 'react-icons/fa';
import { request, fetchUser} from '../../../helper/helper';

function Create({show,handleClose,setUpdate,update}) {
  const [post, setPost] = useState('');
  const [feeling, setFeeling] = useState(0);
  const [location, setLocation] = useState('');
  const [user,setUser] = useState({});

  const resetForm=()=>{
    setPost('');
    setLocation('');
    setFeeling(0);
  }  

  useEffect(()=>{
    fetchUser().then((res)=>setUser(res.data));
  },[setUser])
  const createPost=()=>{
    request.post('/posts/create',{
      user:{
        id:user._id,
        name:user.name,
        last_name:user.last_name,
        username:user.username,
      },
      body:post,
      feeling:feeling,
      location:location,
      date:new Date().toLocaleString(),
      like_count:0,
    }).catch((error)=>{
      console.log(error);
    }).finally(()=>{
      setUpdate(!update);
      handleClose();
      resetForm();
    })
  }

  return (
      <Modal show={show} onHide={()=>{handleClose();resetForm();}} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>New Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="row mb-3">
              <ButtonGroup className='col-xl-7 col-lg-7 col-sm-12 pb-3'>
                <input type="radio" className="btn-check" name="btnradio" id="btnradio1" onClick={()=>setFeeling(1)}></input>
                <label className="btn btn-outline-primary" htmlFor="btnradio1"><FaSmile size={30}></FaSmile></label>
                <input type="radio" className="btn-check" name="btnradio" id="btnradio2" onClick={()=>setFeeling(2)}></input>
                <label className="btn btn-outline-primary" htmlFor="btnradio2"><FaGrinTears size={30}></FaGrinTears></label>
                <input type="radio" className="btn-check" name="btnradio" id="btnradio3" onClick={()=>setFeeling(3)}></input>
                <label className="btn btn-outline-primary" htmlFor="btnradio3"><FaGrinHearts size={30}></FaGrinHearts></label>
                <input type="radio" className="btn-check" name="btnradio" id="btnradio4" onClick={()=>setFeeling(4)}></input>
                <label className="btn btn-outline-primary" htmlFor="btnradio4"><FaSurprise size={30}></FaSurprise></label>
                <input type="radio" className="btn-check" name="btnradio" id="btnradio5" onClick={()=>setFeeling(5)}></input>
                <label className="btn btn-outline-primary" htmlFor="btnradio5"><FaFrown size={30}></FaFrown></label>
              </ButtonGroup>
              <div className='col-xl-5 col-lg-5 col-sm-12 d-flex'>
                <FaMapMarkerAlt size={30}></FaMapMarkerAlt>
                <Form.Group className='ms-2'>
                  <Form.Control as="input" onChange={(event)=>setLocation(event.target.value)}/>
                  <Form.Text className='text-danger' muted={location.length<=26?true:false}>{location.length}/26</Form.Text>
                </Form.Group>
              </div>              
            </div>
            <Form.Group className="mb-3">
              <Form.Control as="textarea" rows={3} onChange={(event)=>setPost(event.target.value)}/>
              <Form.Text className='text-danger' muted={post.length<=250?true:false}>{post.length}/250</Form.Text>
            </Form.Group>
          </Form>
          
          </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={createPost} disabled={post===''||post.length>250||location.length>26}>
            Post
          </Button>
        </Modal.Footer>
      </Modal>
  )
}

export default Create;