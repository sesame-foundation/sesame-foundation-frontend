import React, { useState, useRef } from "react";
import { signerContract } from "../utils.js";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

export function DonateButton({ onDonate }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const formControl = useRef(null);

  function handleDonation() {
    signerContract.donate({ value: formControl.current.value }).then(() => {
      onDonate();
      handleClose();
    });
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Donate
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Donate to prize</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <FormControl
              ref={formControl}
              placeholder="Amount (eth)"
              aria-label="Amount (eth)"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleDonation}>
            Donate
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
