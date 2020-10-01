import React, { useEffect, useState, Component } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function Example({ userList }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="secondary" onClick={handleShow}>
        Sold Tokens
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Token Bought By</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ol>
            {userList &&
              userList.map((items) => {
                return (
                  <li>
                    <div
                      className="soldTokenModal"
                      class="shadow-lg p-3 mb-5 bg-white rounded "
                    >
                      <h6>Name: {items.name}</h6>
                      <h6>Email: {items.email}</h6>
                      <div>
                        {" "}
                        <img
                          src={items.image}
                          style={{
                            width: "90px",
                            height: "90px",
                            marginBottom: "10px",
                          }}
                        />
                      </div>
                    </div>
                  </li>
                );
              })}
          </ol>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;
