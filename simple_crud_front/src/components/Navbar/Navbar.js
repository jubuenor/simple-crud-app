import React, { useState } from "react";
import { Nav, Container, Button, Modal } from "react-bootstrap";
import {
  FaHome,
  FaUser,
  FaPlusCircle,
  FaSeedling,
  FaInfoCircle,
} from "react-icons/fa";
import "./Navbar.css";
import Create from "./Create/Create";

function Navbar() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Create show={show} handleClose={handleClose}></Create>

      <Nav className="nav-bar d-flex justify-content-between">
        <Container>
          <Nav.Link className="rounded">
            <FaSeedling size={30} color="aliceblue"></FaSeedling>
          </Nav.Link>
        </Container>
        <Container className="justify-content-center">
          <Nav.Item>
            <Nav.Link className="rounded" onClick={handleShow}>
              <div className="d-flex">
                <FaPlusCircle size={30} color="aliceblue"></FaPlusCircle>
                <div className="ms-3 mt-2">Create</div>
              </div>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="rounded">
              <div className="d-flex">
                <FaHome size={30} color="aliceblue"></FaHome>
                <div className="ms-3 mt-2">Home</div>
              </div>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="rounded">
              <div className="d-flex">
                <FaUser size={30} color="aliceblue"></FaUser>
                <div className="ms-3 mt-2">Profile</div>
              </div>
            </Nav.Link>
          </Nav.Item>
        </Container>
        <Container>
          <Nav.Item>
            <Nav.Link className="rounded info">
              <div className="d-flex">
                <FaInfoCircle size={30} color="aliceblue"></FaInfoCircle>
                <div className="ms-3 mt-2">More</div>
              </div>
            </Nav.Link>
          </Nav.Item>
        </Container>
      </Nav>
    </>
  );
}

export default Navbar;
