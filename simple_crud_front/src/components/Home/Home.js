import React, { useState, useEffect } from "react";
import { Container, Card, Button } from "react-bootstrap";
import "./Home.css";
import {FaSmileBeam, FaMapMarkerAlt, FaRegHeart, FaHeart} from "react-icons/fa";
import { request, fetchUser } from '../../helper/helper';
import Loading from '../Loading/Loading';  
import axios from 'axios';
import app from '../../app.json';

const {APIHOST} = app;

function Btn({post,like_post,isLiked}){
  const [liked,setLiked]=useState(isLiked);
  const handleLiked = ()=>setLiked(!liked);
  return(
    <Button className={liked?"btn-primary":"btn-light"} onClick={()=>{like_post(post._id,liked);handleLiked()}}>
      {post.like_count} {liked?<FaHeart size={20}></FaHeart>:<FaRegHeart size={20}></FaRegHeart>}
    </Button>
  )
}

function Home(props) {
  const [loading, setLoading] = useState(true);

  const [posts, setPosts]=useState([]);
  const [user, setUser]=useState({});

  const fetchPosts=()=>{
    request.get('/posts/')
    .then((response)=>{
      setPosts(response.data.reverse());
      setLoading(false);
    }).catch((error)=>{
      console.log(error);
    });
  }
  useEffect(() => {
      fetchUser()
      .then((res)=>setUser(res.data));
      fetchPosts();
  },[setPosts, setUser, props.update]);

  const like_post=(id,liked)=>{
    if(!liked){
      user.likes.push(id);
    }else{
      let likes=user.likes.filter((element)=>element!==id)
      user.likes=likes;
    }
    axios.put(`${APIHOST}/users/${user._id}`,
        user
      ).then((response)=>{
        console.log(response);
      })
    console.log(user);
  }

  const feed=()=>posts.map((post,index)=>{
    const isLiked = user.likes.find(element => element === post._id)?true:false;
    return(
      <Card className="p-3 mb-2 mt-2" key={index}>
        <Container className="row justify-content-between">
          <Container className="col-xl-6 col-md-12">
            <h5 className="text-start">
              {`${post.user[0].name} ${post.user[0].last_name}`} <span>@{post.user[0].username}</span>
            </h5>
            <p className="text-start">{post.date}</p>
          </Container>
          <Container className="col-xl-5 col-md-11 d-flex justify-content-between me-4">
            <div className="d-flex place">
              <div>
                <FaMapMarkerAlt size={30}></FaMapMarkerAlt>
              </div>
              <div className="mt-2">{post.location}</div>
            </div>
            <div>
              <FaSmileBeam size={30}></FaSmileBeam>
            </div>
          </Container>
        </Container>
        <Card.Body>
          <Card.Text>
            {post.body}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Btn post={post} like_post={like_post} isLiked={isLiked}></Btn>
        </Card.Footer>
      </Card>      
    )
  })

  return (
    <div className="home d-flex flex-column align-items-center">
      
      {posts.length===0?<Loading show={loading}></Loading>:feed()}

    </div>
  );
}

export default Home;
