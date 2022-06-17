import React, { useContext, useState, useRef } from "react";
import { getSigner, getSignerContract } from "../utils.js";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import { WalletContext } from "../contexts/WalletContext";

export function DonateButton({ onDonate }) {
  const [show, setShow] = useState(false);
  const { connectWallet } = useContext(WalletContext);
  const { account } = useWeb3React();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const formControl = useRef(null);

  function handleDonation() {
    let value = ethers.utils.parseEther(formControl.current.value);
    getSigner().then((signer) => {
      getSignerContract(signer)
        .donate({ value: value })
        .then(() => {
          onDonate();
          handleClose();
        });
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
              type="number"
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          {!account ? (
            <Button variant="primary" onClick={() => connectWallet()}>
              Connect Wallet
            </Button>
          ) : (
            <Button variant="primary" onClick={handleDonation}>
              Donate
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}
