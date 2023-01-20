import React, {useState} from 'react';
import './EditablePost.css';
import {Button, Form, ButtonGroup } from 'react-bootstrap';
import { FaSmile, FaSurprise, FaGrinHearts, FaGrinTears, FaFrown, FaMapMarkerAlt, FaEdit, FaTrash, FaCheck } from 'react-icons/fa';
import { GiCancel } from 'react-icons/gi';
import { request} from '../../../helper/helper';

function EditablePost(props) {
    const [post, setPost] = useState(props.post.body);
    const [feeling, setFeeling] = useState(props.post.feeling);
    const [location, setLocation] = useState(props.post.location);
    const [disabled, setDisabled] = useState(true);

    const savePost=()=>{
        request.put(`/posts/${props.post._id}`,
        {
            user: props.post.user,
            body: post,
            feeling: feeling,
            location: location,
            date: props.post.date,
            like_count: props.post.like_count
        }
        ).catch((error)=>{
        console.log(error);
        }).finally(()=>setDisabled(true));
        
    }

return (
    <div className='editable-post d-flex mb-4'>
        <Form>
        <div className="row mb-3">
            <ButtonGroup className='col-xl-7 col-lg-7 col-sm-12 pb-3'>
            <input type="radio" className="btn-check" name="btnradio" id="btnradio1" onClick={()=>setFeeling(1)} defaultChecked={feeling==='1'} disabled={disabled}></input>
            <label className="btn btn-outline-primary" htmlFor="btnradio1"><FaSmile size={30}></FaSmile></label>
            <input type="radio" className="btn-check" name="btnradio" id="btnradio2" onClick={()=>setFeeling(2)} defaultChecked={feeling==='2'} disabled={disabled}></input>
            <label className="btn btn-outline-primary" htmlFor="btnradio2"><FaGrinTears size={30}></FaGrinTears></label>
            <input type="radio" className="btn-check" name="btnradio" id="btnradio3" onClick={()=>setFeeling(3)} defaultChecked={feeling==='3'} disabled={disabled}></input>
            <label className="btn btn-outline-primary" htmlFor="btnradio3"><FaGrinHearts size={30}></FaGrinHearts></label>
            <input type="radio" className="btn-check" name="btnradio" id="btnradio4" onClick={()=>setFeeling(4)} defaultChecked={feeling==='4'} disabled={disabled}></input>
            <label className="btn btn-outline-primary" htmlFor="btnradio4"><FaSurprise size={30}></FaSurprise></label>
            <input type="radio" className="btn-check" name="btnradio" id="btnradio5" onClick={()=>setFeeling(5)} defaultChecked={feeling==='5'} disabled={disabled}></input>
            <label className="btn btn-outline-primary" htmlFor="btnradio5"><FaFrown size={30}></FaFrown></label>
            </ButtonGroup>
            <div className='col-xl-5 col-lg-5 col-sm-12 d-flex'>
            <FaMapMarkerAlt size={30}></FaMapMarkerAlt>
            <Form.Group className='ms-2'>
                <Form.Control as="input" onChange={(event)=>setLocation(event.target.value)} defaultValue={location}  disabled={disabled}/>
                <Form.Text className='text-danger' muted={location.length<=26?true:false}>{location.length}/26</Form.Text>
            </Form.Group>
            </div>              
        </div>
        <Form.Group className="mb-3">
            <Form.Control as="textarea" rows={3} onChange={(event)=>setPost(event.target.value)} defaultValue={post}  disabled={disabled}/>
            <Form.Text className='text-danger' muted={post.length<=250?true:false}>{post.length}/250</Form.Text>
        </Form.Group>
        </Form>
        <div className='d-flex justify-content-center me-5 btns'>
            {disabled?
            <>
            <Button className='btn-sm m-2' variant='outline-light' onClick={()=>setDisabled(false)}><FaEdit size={20}></FaEdit></Button>
            <Button className='btn-sm m-2'  variant='danger outline-light' onClick={()=>props.deletePost(props.post)}><FaTrash size={20}></FaTrash></Button>
            </>
            :
            <>
            <Button className='btn-sm m-2' variant='outline-success' onClick={savePost}><FaCheck size={20}></FaCheck></Button>
            <Button className='btn-sm m-2'  variant='outline-secondary' onClick={()=>{setDisabled(true);}}><GiCancel size={20}></GiCancel></Button>
            </>              
            }
            
            </div>
    
    </div>
    
    
  )
}

export default EditablePost