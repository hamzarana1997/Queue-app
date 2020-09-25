import React, { useEffect, useState, Component } from "react"
import ReactDom from "react-dom"
import MyMapComponent from "./Map"

import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import ModalDialog from 'react-bootstrap/ModalDialog'
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalTitle from 'react-bootstrap/ModalTitle'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalFooter from 'react-bootstrap/ModalFooter'
import { addCompany } from "../config/Firebase"
function ModalBox({companyId}){
  const cid = companyId
  console.log("===========>",companyId)
  const onAdd = function () {
    addCompany(compName, address, since, image,cid)
  }

  const [show, setShow] = useState(false);
  const [compName, setCompName] = useState("")
  const [address, setAddress] = useState("")
  const [since, setSince] = useState("")
  const [image, setImage] = useState()
  const [map, setMap] = useState([])

  const getImage = (e) => {
    let file = e.target.files[0]
    setImage(file)
  }
  const getMap = (data) => {
    console.log("get map data in function", data.response.venues)
    setMap(data.response.venues)

  }
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="ModalButton" variant="success" onClick={handleShow} style={{borderRadius:"40px"}}>
        +
        </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Your Company</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input placeholder="Name of the company" onChange={(e) => { setCompName(e.target.value) }} />
          <br />
          {/* <input  placeholder="since" onChange={(e)=>{setAddress(e.target.value)}}/> */}
          <br />
          <input placeholder="since" onChange={(e) => { setSince(e.target.value) }} />
          <br />
          <br />
          <input type="file" onChange={getImage} />
          <br />
          <br />
          <label>Select location</label>
          <select onChange={e => { setAddress(e.target.value) }}>
            {map && map.map(items => <option value={items.name}>{items.name}</option>)}
          </select>
          <MyMapComponent
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `250px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            getmap={getMap}
          />



        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
            </Button>
          <Button variant="success" onClick={onAdd}>
            Add
            </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


export default ModalBox;