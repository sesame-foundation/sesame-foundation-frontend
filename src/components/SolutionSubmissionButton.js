import React, { useState, useRef } from "react";
import { getSignerContract, getSigner } from "../utils.js";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { ethers } from "ethers";
const bn = require("bn.js");

function encodeInteger(integer) {
  let value_hex = new bn(integer.toString(), 10).toString("hex");
  return (
    "0x" +
    (value_hex.length % 64 !== 0
      ? "0".repeat(64 - (value_hex.length % 64))
      : "") +
    value_hex
  );
}

function generateClaim(address, factor1, factor2) {
  console.log("Generating claim");
  let encoded = ethers.utils.defaultAbiCoder.encode(
    ["address", "bytes", "bytes"],
    [address, encodeInteger(factor1), encodeInteger(factor2)]
  );
  return ethers.utils.keccak256(encoded, { encoding: "hex" });
}

export function SolutionSubmissionButton({ withdrawalDelay, onSubmitSolution }) {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const factor1Ref = useRef(null);
  const factor2Ref = useRef(null);

  function handleSubmission() {
    let factor1 = factor1Ref.current.value;
    let factor2 = factor2Ref.current.value;
    getSigner().then((signer) => {
      signer.getAddress().then((address) => {
        let claim = generateClaim(address, factor1, factor2);
        getSignerContract(signer).claims(claim).then((blockNumber) => {
          console.log(blockNumber);
          if (blockNumber.eq(0)) {
            setIsLoading(true);
            getSignerContract(signer)
              .submitClaim(claim)
              .then((transactionResponse) => {
                setMessage("Successfully submitted claim");
                setIsLoading(false);
                onSubmitSolution();
                return transactionResponse.wait();
              })
              .then((transactionReceipt) => {
                console.log(transactionReceipt);
              });
          } else {
            getSignerContract(signer)
              .withdraw(encodeInteger(factor1), encodeInteger(factor2))
              .then((transactionResponse) => {
                setMessage("Successfully withdrew prize");
                setIsLoading(false);
                onSubmitSolution();
                return transactionResponse.wait();
              })
              .then((transactionReceipt) => {
                console.log(transactionReceipt);
              })
              .catch((exception) => {
                setMessage(exception.toString());
              });
          }
        });
      });
    });
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Submit solution
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Submit solution</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Withdrawal delay (blocks): {withdrawalDelay}</p>

          <InputGroup className="mb-3">
            <FormControl
              ref={factor1Ref}
              placeholder="First factor"
              aria-label="First factor"
              aria-describedby="basic-addon1"
              type="number"
            />
            <FormControl
              ref={factor2Ref}
              placeholder="Second factor"
              aria-label="Second factor"
              aria-describedby="basic-addon1"
              type="number"
            />
          </InputGroup>
          {message}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmission}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
