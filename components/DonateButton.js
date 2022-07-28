import React, { useEffect, useState, useRef } from "react";
import { getSigner, getSignerContract, provider } from "../utils/utils.js";
import Button from "react-bootstrap/Button";
import ConnectWalletButton from "./ConnectWalletButton.js";
import Modal from "react-bootstrap/Modal";
import FormControl from "react-bootstrap/FormControl";
import FormFloating from "react-bootstrap/FormFloating";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";

export default function DonateButton({ contractName, onDonate }) {
  const [balance, setBalance] = useState(null);
  const [donationButtonText, setDonationButtonText] = useState("Donate");
  const [isDonationDisabled, setIsDonationDisabled] = useState(true);
  const [show, setShow] = useState(false);
  const { account } = useWeb3React();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const updateBalance = () => {
    provider.getBalance(account).then((balance) => {
      const formattedBalance = ethers.utils.formatEther(balance);
      const roundedBalance = Math.round(formattedBalance * 1e6) / 1e6;
      setBalance(roundedBalance);
    });
  };
  const setDonationValue = (donationValue) => {
    if (donationValue === "" || donationValue <= 0) {
      setIsDonationDisabled(true);
      setDonationButtonText("Donate");
    } else if (donationValue > balance) {
      setIsDonationDisabled(true);
      setDonationButtonText("Insufficient ETH Balance");
    } else {
      setIsDonationDisabled(false);
      setDonationButtonText("Donate");
    }
  };

  const formControl = useRef(null);

  useEffect(() => {
    updateBalance();
  });

  function handleDonation() {
    let value = ethers.utils.parseEther(formControl.current.value);
    getSigner().then((signer) => {
      const signerContract = getSignerContract(contractName, signer);
      if (signerContract === undefined) return;
      signerContract.donate({ value: value }).then(() => {
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
          <FormFloating className="mb-2">
            <FormControl
              size="lg"
              ref={formControl}
              placeholder="Amount (ETH)"
              aria-label="Amount (ETH)"
              aria-describedby="basic-addon1"
              type="number"
              id="donation-amount"
              onInput={(e) => setDonationValue(e.target.value)}
            />
            <label htmlFor="donation-amount">Amount (ETH)</label>
          </FormFloating>
          {account && (
            <p className="text-end">
              <small>Balance: {balance}</small>
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <ConnectWalletButton>
            <Button
              variant="primary"
              onClick={handleDonation}
              disabled={isDonationDisabled}
            >
              {donationButtonText}
            </Button>
          </ConnectWalletButton>
        </Modal.Footer>
      </Modal>
    </>
  );
}
