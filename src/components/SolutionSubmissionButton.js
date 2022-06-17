import React, { useContext, useState, useRef } from "react";
import { getSignerContract, getSigner } from "../utils.js";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import { WalletContext } from "../contexts/WalletContext";

const bn = require("bn.js");

const DEFAULT_SALT = "0x00";

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
  let encoded = ethers.utils.defaultAbiCoder.encode(
    ["address", "bytes", "bytes", "bytes"],
    [address, encodeInteger(factor1), encodeInteger(factor2), DEFAULT_SALT]
  );
  return ethers.utils.keccak256(encoded, { encoding: "hex" });
}

export function SolutionSubmissionButton({
  withdrawalDelay,
  onSubmitSolution,
}) {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { account } = useWeb3React();
  const { connectWallet } = useContext(WalletContext);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const factor1Ref = useRef(null);
  const factor2Ref = useRef(null);

  function handleSubmission() {
    let factor1 = factor1Ref.current.value;
    let factor2 = factor2Ref.current.value;

    let positive_integer_regex = /^\d+$/;
    if (
      !positive_integer_regex.test(factor1) ||
      !positive_integer_regex.test(factor2)
    ) {
      alert("Factors must be positive integers");
      return;
    }

    getSigner().then((signer) => {
      signer.getAddress().then((address) => {
        let claim = generateClaim(address, factor1, factor2);
        getSignerContract(signer)
          .claims(claim)
          .then((blockNumber) => {
            console.log(blockNumber);
            if (blockNumber.eq(0)) {
              setIsLoading(true);
              getSignerContract(signer)
                .submitClaim(claim)
                .then((transactionResponse) => {
                  setMessage(
                    "Successfully submitted claim. Please wait " +
                      withdrawalDelay +
                      " blocks before withdrawing prize."
                  );
                  setIsLoading(false);
                  onSubmitSolution();
                  return transactionResponse.wait();
                })
                .then((transactionReceipt) => {
                  console.log(transactionReceipt);
                });
            } else {
              getSignerContract(signer)
                .withdraw(
                  encodeInteger(factor1),
                  encodeInteger(factor2),
                  DEFAULT_SALT
                )
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
                  const error =
                    "Error: VM Exception while processing transaction: reverted with reason string";
                  const reason = exception.reason
                    ? exception.reason
                    : exception.data.message;
                  const message = reason.replace(error, "");
                  setMessage("Error: " + message);
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
          <ol>
            <li>Submit the factors to create a sealed claim.</li>
            <li>
              Wait the duration of the withdrawal delay. At least{" "}
              {withdrawalDelay} blocks must be mined before withdrawal.
            </li>
            <li>
              Re-submit the factors to attempt to withdraw the prize. If the
              factors are valid, the prize will be transferred to the claimant's
              wallet.
            </li>
          </ol>
          <p>
            For more details, visit the <a href="/about">About</a> page.
          </p>
          <InputGroup className="mb-3">
            <FormControl
              ref={factor1Ref}
              placeholder="First factor"
              aria-label="First factor"
              aria-describedby="basic-addon1"
              type="text"
            />
            <FormControl
              ref={factor2Ref}
              placeholder="Second factor"
              aria-label="Second factor"
              aria-describedby="basic-addon1"
              type="text"
            />
          </InputGroup>
          {message}
        </Modal.Body>
        <Modal.Footer>
          {!account ? (
            <Button variant="primary" onClick={() => connectWallet()}>
              Connect Wallet
            </Button>
          ) : (
            <Button variant="primary" onClick={handleSubmission}>
              Submit
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}
