import React, { useEffect, useState,Component } from "react"
import ReactDom from "react-dom"

import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import ModalDialog from 'react-bootstrap/ModalDialog'
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalTitle from 'react-bootstrap/ModalTitle'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalFooter from 'react-bootstrap/ModalFooter'
import {addCompany} from "../config/Firebase"
function Example() {
  const onAdd = function(){
addCompany(compName,address,since,image)
  }

    const [show, setShow] = useState(false);
    const [compName, setCompName] = useState("")
    const [address, setAddress] = useState("")
    const [since, setSince] = useState("")
    const [image, setImage] = useState()
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input placeholder="Name of the company" onChange={(e)=>{setCompName(e.target.value)}}/> 
            <br/>
            <input  placeholder="since" onChange={(e)=>{setAddress(e.target.value)}}/>
            <br/>
            <input placeholder="Address" onChange={(e)=>{setSince(e.target.value)}}/>
            <input type="file" onChange={(e)=>{setImage(e.target.files[0])}}/>
            


          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={onAdd}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
 
 
  export default Example;