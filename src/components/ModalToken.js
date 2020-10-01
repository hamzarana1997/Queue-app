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
import { addToken } from "../config/Firebase";
import { useParams } from "react-router-dom";

function Example(props) {
  let { slug } = useParams();
  const date = new Date(Date.now());
  const currentDate = date.getDate();

  const [token, setToken] = useState("");
  const onAdd = function () {
    addToken(token, slug, handleClose, props, currentDate);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        className="ModalButtonToken"
        variant="success"
        onClick={handleShow}
      >
        Add Token
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Token For Your Company</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            placeholder="Add Token"
            onChange={(e) => {
              setToken(e.target.value);
            }}
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

export default Example;
