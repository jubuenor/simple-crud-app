import React, { useState, useEffect } from "react";
import "./Home.css";
import { request, fetchUser } from '../../helper/helper';
import Loading from '../Loading/Loading';  
import axios from 'axios';
import app from '../../app.json';
import Post from './Post/Post';

const {APIHOST} = app;


function Home(props) {
  const [loading, setLoading] = useState(false);

  const [posts, setPosts]=useState([]);
  const [user, setUser]=useState({});

  const fetchPosts=()=>{
    setLoading(true);
    request.get('/posts/')
    .then((response)=>{
      setPosts(response.data.reverse());
      setLoading(false);
    }).catch((error)=>{
      console.log(error);
    });
  }
  useEffect(() => {
    setPosts([]);
    fetchUser()
    .then((res)=>setUser(res.data));
    fetchPosts();
  },[props.update]);

  const like_post=(id,liked,index)=>{
    if(!liked){
      user.likes.push(id);
      posts[index].like_count=Number(posts[index].like_count)+1;   
    }else{
      let likes=user.likes.filter((element)=>element!==id)
      user.likes=likes;
      posts[index].like_count=Number(posts[index].like_count)-1;      
    }
    axios.put(`${APIHOST}/users/${user._id}`,
      user
    ).catch((error)=>{
      console.log(error);      
    });

    request.put(`/posts/${posts[index]._id}`,
      posts[index]
    ).catch((error)=>{
      console.log(error);
    })
  }

  const feed=()=>posts.map((post,index)=>{
    const isLiked = user.likes.find(element => element === post._id)?true:false;
    return(
      <Post isLiked={isLiked} post={post} like_post={like_post} key={index} index={index}></Post>
    )
  })

  return (
    <div className="home d-flex flex-column align-items-center">
      <Loading show={loading}></Loading>
      {feed()}

    </div>
  );
}

export default Home;
