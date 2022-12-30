import React, {useState} from 'react';
import './Create.css';
import { Modal, Button, Form, ButtonGroup } from 'react-bootstrap'
import { FaSmile, FaSurprise, FaGrinHearts, FaGrinTears, FaFrown, FaMapMarkerAlt } from 'react-icons/fa';

function Create({show,handleClose}) {

  const [post, setPost] = useState('');
  const [place, setPlace] = useState('');

  const resetForm=()=>{
    setPost('');
    setPlace('');
  }

  return (
      <Modal show={show} onHide={()=>{handleClose();resetForm()}} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>New Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="row mb-3">
              <ButtonGroup className='col-xl-7 col-lg-7 col-sm-12 pb-3'>
                <input type="radio" className="btn-check" name="btnradio" id="btnradio1"></input>
                <label className="btn btn-outline-primary" htmlFor="btnradio1"><FaSmile size={30}></FaSmile></label>
                <input type="radio" className="btn-check" name="btnradio" id="btnradio2"></input>
                <label className="btn btn-outline-primary" htmlFor="btnradio2"><FaGrinTears size={30}></FaGrinTears></label>
                <input type="radio" className="btn-check" name="btnradio" id="btnradio3"></input>
                <label className="btn btn-outline-primary" htmlFor="btnradio3"><FaGrinHearts size={30}></FaGrinHearts></label>
                <input type="radio" className="btn-check" name="btnradio" id="btnradio4"></input>
                <label className="btn btn-outline-primary" htmlFor="btnradio4"><FaSurprise size={30}></FaSurprise></label>
                <input type="radio" className="btn-check" name="btnradio" id="btnradio5"></input>
                <label className="btn btn-outline-primary" htmlFor="btnradio5"><FaFrown size={30}></FaFrown></label>
              </ButtonGroup>
              <div className='col-xl-5 col-lg-5 col-sm-12 d-flex'>
                <FaMapMarkerAlt size={30}></FaMapMarkerAlt>
                <Form.Group className='ms-2'>
                  <Form.Control as="input" onChange={(event)=>setPlace(event.target.value)}/>
                  <Form.Text className='text-danger' muted={place.length<=26?true:false}>{place.length}/26</Form.Text>
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
          <Button variant="light" onClick={()=>{handleClose();resetForm()}}>
            Post
          </Button>
        </Modal.Footer>
      </Modal>
  )
}

export default Create;