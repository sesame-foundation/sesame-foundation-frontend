import React, { useState } from "react";
import { signerContract } from "../utils.js";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export function DonateButton({ onDonate }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleDonation() {
    signerContract.donate({ value: 1 }).then(() => {
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
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleDonation}>
            Donate
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
