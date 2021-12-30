import React, { useState, useRef } from "react";
import { signerContract, signer } from "../utils.js";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { ethers } from "ethers";

function generateClaim(address, factor1, factor2) {
  let encoded = ethers.utils.defaultAbiCoder.encode(
    ["address", "uint256", "uint256"],
    [address, factor1, factor2]
  );
  return ethers.utils.keccak256(encoded);
}

export function SolutionSubmissionButton({ onSubmitSolution }) {
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
    signer.getAddress().then((address) => {
      let claim = generateClaim(address, factor1, factor2);
      signerContract.claims(claim).then((blockNumber) => {
        console.log(blockNumber);
        if (blockNumber.eq(0)) {
          setIsLoading(true);
          signerContract.submitClaim(claim).then(() => {
            setMessage("Successfully submitted claim");
            setIsLoading(false);
            onSubmitSolution();
          });
        } else {
          signerContract
            .withdraw(factor1, factor2)
            .then(() => {
              setMessage("Successfully withdrew prize");
              setIsLoading(false);
              onSubmitSolution();
            })
            .catch((exception) => {
              setMessage(exception.toString());
            });
        }
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
