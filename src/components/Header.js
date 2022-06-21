import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Logo from "../logo.png";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { ConnectWalletButton } from "./ConnectWalletButton.js";
import { LinkContainer } from "react-router-bootstrap";
import { useWeb3React } from "@web3-react/core";
import { prettyAddress } from "../utils.js";
import { WalletContext } from "../contexts/WalletContext";

export const Header = () => {
  const [address, setAddress] = useState(null);
  const { account } = useWeb3React();
  const { disconnectWallet } = useContext(WalletContext);

  useEffect(() => {
    prettyAddress(account).then((address) => {
      setAddress(address);
    });
  });

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <img
              src={Logo}
              alt="Sesame Foundation"
              width="30px"
              className="me-2"
            />
            Sesame Foundation
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav activeKey={window.location.pathname} className="me-auto">
            <LinkContainer to="/about">
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/terms">
              <Nav.Link>Terms</Nav.Link>
            </LinkContainer>
          </Nav>
          <ConnectWalletButton>
            <Button variant="secondary" onClick={() => disconnectWallet()}>
              {address}
            </Button>
          </ConnectWalletButton>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
