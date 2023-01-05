import React, {UseState} from 'react';
import {Navigate , Outlet} from 'react-router-dom';
import {getSession} from '../../helper/helper';

function Privaterouter() {
    const checkAuth=()=>{
        return getSession()?true:false;
    }

    const auth = checkAuth();

  return (
    auth?<Outlet></Outlet>:<Navigate to="/login"></Navigate>
  )
}

export default Privaterouter;