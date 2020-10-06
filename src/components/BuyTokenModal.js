import React, { useEffect, useState, Component } from "react";
import ReactDom from "react-dom";
import MyMapComponent from "./Map";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ModalDialog from "react-bootstrap/ModalDialog";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import firebase, { addCompany, addCustomer } from "../config/Firebase";
import { useParams } from "react-router-dom";

function Example(props) {
  const userid = props.sl;
const fbId = props.uid;
  const onAdd = function () {
    addCustomer(name, email, image, userid, props, handleClose, tokenNo,fbId);
  };
  const [tokenNo, setTokenNo] = useState();
  

  const getTokenNo = function () {
    firebase
      .firestore()
      .collection("companies")
      .doc(userid)
      .get()
      .then(function (doc) {
        setTokenNo(doc.data().currentTokenBought);
        
      });
  };
  const [show, setShow] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    getTokenNo();
  }, []);

  return (
    <>
      <Button
        className="ModalButtonToken"
        variant="success"
        onClick={handleShow}
      >
        Buy Token
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            placeholder="Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="file"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
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
