import React, {useState} from 'react';
import { Container, Card, Button } from "react-bootstrap";
import { FaMapMarkerAlt, FaRegHeart, FaHeart,FaSmile, FaSurprise, FaGrinHearts, FaGrinTears, FaFrown, } from "react-icons/fa";
import './Post.css';

function Post(props) {
    const [liked,setLiked]=useState(props.isLiked);
    const handleLiked = () =>setLiked(!liked);

    const feeling=(feel)=>{
        switch(feel){
            case '1':
                return <FaSmile size={30}></FaSmile>
            case '2':
                return <FaGrinTears size={30}></FaGrinTears>
            case '3':
                return <FaGrinHearts size={30}></FaGrinHearts>
            case '4':
                return <FaSurprise size={30}></FaSurprise>
            case '5':
                return <FaFrown size={30}></FaFrown>
            default:
                return null;                
        }
    }
  return (
    <Card className="p-3 mb-2 mt-2">
        <Container className="row justify-content-between">
          <Container className="col-xl-6 col-md-12">
            <h5 className="text-start">
              {`${props.post.user[0].name} ${props.post.user[0].last_name}`} <span>@{props.post.user[0].username}</span>
            </h5>
            <p className="text-start">{props.post.date}</p>
          </Container>
          <Container className={`col-xl-5 col-md-11 d-flex ${props.post.location&&feeling(props.post.feeling)?'justify-content-between':'justify-content-center'} me-4`}>
            {props.post.location?
            <>
            <div className="d-flex location">
                <div>
                <FaMapMarkerAlt size={30}></FaMapMarkerAlt>
                </div>
                <div className="mt-2">{props.post.location}</div>
            </div>
            </>
            :null
            }
            <div>
                {feeling(props.post.feeling)}
            </div>
          </Container>
        </Container>
        <Card.Body>
          <Card.Text>
            {props.post.body}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button className={liked?"btn-primary":"btn-light"} onClick={()=>{props.like_post(props.post._id,liked,props.index);handleLiked()}}>
            {props.post.like_count} {liked?<FaHeart size={20}></FaHeart>:<FaRegHeart size={20}></FaRegHeart>}
        </Button>
        </Card.Footer>
      </Card>      
  )
}

export default Post