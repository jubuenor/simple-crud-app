import React, { useState } from "react";
import { Nav, Container} from "react-bootstrap";
import {  FaHome,  FaUser,  FaPlusCircle,  FaSeedling,  FaInfoCircle, FaSignInAlt, FaUserPlus} from "react-icons/fa";
import "./Navbar.css";
import Create from "./Create/Create";
import { Link } from "react-router-dom";

function Navbar(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      
      <Nav className="nav-bar d-flex justify-content-between">
        <Container>
          <Link to='/home' className="rounded nav-link">
            <FaSeedling size={30} color="aliceblue"></FaSeedling>
          </Link>
        </Container>
        
        <Container className="justify-content-center">
        {props.isLogged?
        <>
        <Create show={show} handleClose={handleClose} setUpdate={props.setUpdate} update={props.update}></Create>
        <Nav.Item>
            <Nav.Link className="rounded nav-link" onClick={handleShow}>
              <div className="d-flex">
                <FaPlusCircle size={30} color="aliceblue"></FaPlusCircle>
                <div className="ms-3 mt-2">Create</div>
              </div>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Link to='/home' className="rounded nav-link">
              <div className="d-flex">
                <FaHome size={30} color="aliceblue"></FaHome>
                <div className="ms-3 mt-2">Home</div>
              </div>
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to='/profile' className="rounded nav-link">
              <div className="d-flex">
                <FaUser size={30} color="aliceblue"></FaUser>
                <div className="ms-3 mt-2">Profile</div>
              </div>
            </Link>
          </Nav.Item>
        </>
      :<>
        <Nav.Item>
          <Link to='/login' className="rounded nav-link">
            <div className="d-flex">
              <FaSignInAlt size={25} color="aliceblue"></FaSignInAlt>
              <div className="ms-1 mt-2">Sign in</div>
            </div>
          </Link>
        </Nav.Item>
        <Nav.Item>
            <Link to='/signup' className="rounded nav-link">
              <div className="d-flex">
                <FaUserPlus size={25} color="aliceblue"></FaUserPlus>
                <div className="ms-1 mt-2">Sign up</div>
              </div>
            </Link>
          </Nav.Item>
        </>}
      </Container>  
        
        <Container>
          <Nav.Item>
            <Link to='/about' className="rounded nav-link info">
              <div className="d-flex">
                <FaInfoCircle size={30} color="aliceblue"></FaInfoCircle>
                <div className="ms-3 mt-2">More</div>
              </div>
            </Link>
          </Nav.Item>
        </Container>
      </Nav>
    </>
  );
}

export default Navbar;
