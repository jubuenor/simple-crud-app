import React, {useState} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../components/Home/Home';
import Login from '../components/SignIn/SignIn';
import Register from '../components/SignUp/SignUp';
import Navbar from '../components/Navbar/Navbar';
import Privaterouter from '../components/auth/Privaterouter';
import {getSession} from '../helper/helper';

const checkAuth=()=>{
  return getSession()?true:false;
}

function AppRouter() {
  const [isLogged, setLogged]=useState(checkAuth());
  const [update, setUpdate ]=useState(false);
  
  return (
    <BrowserRouter>
      <Navbar isLogged={isLogged} setUpdate={setUpdate} update={update}></Navbar>
        <div className='main'>
        <Routes>
            <Route exact path='/' element={<Privaterouter></Privaterouter>}>
              {["/", "/home"].map((path, index) => {
                return (
                  <Route path={path} element={
                      <Home update={update}></Home>
                    }
                    key={index}
                  />
                );
              })}
            </Route>
            <Route exact path="/login" element={<Login setLogged={setLogged}></Login>}></Route>  
            <Route exact path='/signup' element={<Register></Register>}></Route>     
        </Routes>
        </div>
        
    </BrowserRouter>
      
        
  )
}

export default AppRouter;