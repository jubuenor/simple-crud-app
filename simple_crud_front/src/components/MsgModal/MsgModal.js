import React from 'react';
import { Modal } from 'react-bootstrap';

function MsgModal({show,handleClose,msg}){
    return(
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{msg}</Modal.Title>
        </Modal.Header>
      </Modal>
    )
  }

export default MsgModal;