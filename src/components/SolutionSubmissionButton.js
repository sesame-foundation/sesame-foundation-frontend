import React, { useState, useRef } from "react";
import { signerContract, signer } from "../utils.js";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { ethers } from "ethers";

function generateClaim(address, factor1, factor2) {
  console.log(address);
  console.log(typeof address);
  console.log(factor1);
  console.log(factor2);

  let encoded = ethers.utils.defaultAbiCoder.encode(
    ["address", "uint256", "uint256"],
    [address, factor1, factor2]
  );
  return ethers.utils.keccak256(encoded);
}

const STATE_UNSUBMITTED = 0;
const STATE_SUBMITTED_CLAIM = 1;
const STATE_WITHDREW_PRIZE = 2;

function getInfoText(state) {
  switch (state) {
    case STATE_SUBMITTED_CLAIM:
      return "Successfully submitted claim";
      break;
    case STATE_WITHDREW_PRIZE:
      return "Successfully withdrew prize";
      break;
  }
}

export function SolutionSubmissionButton({ onSubmitSolution }) {
  const [show, setShow] = useState(false);
  const [state, setState] = useState(STATE_UNSUBMITTED);
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
            setState(STATE_SUBMITTED_CLAIM);
            setIsLoading(false);
            onSubmitSolution();
          });
        } else {
          signerContract.withdraw(factor1, factor2).then(() => {
            setState(STATE_WITHDREW_PRIZE);
            setIsLoading(false);
            onSubmitSolution();
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
            />
            <FormControl
              ref={factor2Ref}
              placeholder="Second factor"
              aria-label="Second factor"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
          {getInfoText(state)}
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
