import React, {useState,useEffect} from 'react';
import { Container, ListGroup, Button, ButtonGroup} from 'react-bootstrap';
import './Profile.css';
import { request, fetchUser } from '../../helper/helper';
import Loading from '../Loading/Loading';  
import EditablePost from './EditablePost/EditablePost';
import { logout } from '../../helper/helper';
import {FaUser} from "react-icons/fa";
import Post from '../Home/Post/Post';
import axios from 'axios';
import app from '../../app.json';

const {APIHOST}=app;

function Profile() {
    const [show, setShow]=useState('about');
    const [loading, setLoading] = useState(false);

    const [posts, setPosts]=useState([]);
    const [user, setUser]=useState({});
  
    const fetchPosts=()=>{
      setPosts([]);
      request.get('/posts/')
      .then((response)=>{
        setPosts(response.data.reverse());
      }).catch((error)=>{
        console.log(error);
      });
    }
    useEffect(() => {
      setLoading(true);
      Promise.all(
        [
          fetchUser().then((res)=>setUser(res.data)),
          fetchPosts()
        ]
      ).then(()=>{
        setLoading(false);
      })
    },[setPosts,setUser]);
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
    const mylikes=()=>user.likes.map((like,index)=>{
      const post=posts.filter((post)=>like===post._id);
        if(post){
            return(
              <Post isLiked={true} post={post[0]} like_post={like_post} key={index} index={index}></Post>
            )
        }else{
          return null;
        }   
    })
    const deletePost=(post)=>{
      setLoading(true);
      request.delete(`/posts/${post._id}`
        ).then((response)=>{
          let postsaux=posts.filter((p)=>(p._id!==post._id));
          setPosts(postsaux);
        }).catch((error)=>{
            console.log(error);
        }).finally(()=>setLoading(false));
    }

    const myposts=()=>posts.map((post,index)=>{
      if(post.user[0].id===user._id){
        return(
          <EditablePost post={post} key={index} user={user} deletePost={deletePost}></EditablePost>
        )
      }else{
        return null;
      }
    })    

  return (
    <div className='profile container'>
        <Loading show={loading}></Loading>
        <div className='mb-5'>
            <FaUser size={100} color='white'></FaUser>
        </div>
        <Container className='d-flex justify-content-center mb-3'>
            <ButtonGroup className='me-3'>
                <Button variant="light" onClick={()=>setShow('about')}>About</Button>
                <Button variant="light" onClick={()=>setShow('likes')}>Likes</Button>
                <Button variant="light" onClick={()=>setShow('posts')}>Posts</Button>
            </ButtonGroup>
            <div>
                <Button variant='danger' onClick={logout}>Log out</Button>
            </div>
        </Container>
        <Container className='main d-flex flex-column align-items-center'>
        {loading?
        null
        :show==='about'?
        <ListGroup className='mb-3 w-100'>
            <ListGroup.Item>Name: {user.name}</ListGroup.Item>
            <ListGroup.Item>Last name: {user.name}</ListGroup.Item>
            <ListGroup.Item>Username: {user.name}</ListGroup.Item>
        </ListGroup>
        :show==='posts'?
        myposts()
        :mylikes()
        }

        </Container>
        
        

    </div>
  )
}

export default Profile;