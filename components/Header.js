import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import ConnectWalletButton from "./ConnectWalletButton.js";
import Container from "react-bootstrap/Container";
import Logo from "../public/sesame-foundation.png";
import Link from "next/link";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useWeb3React } from "@web3-react/core";
import { prettyAddress } from "../utils/utils.js";
import { WalletContext } from "../contexts/WalletContext";
import { useRouter } from "next/router";

export default function Header() {
  const [address, setAddress] = useState(null);
  const { account } = useWeb3React();
  const { disconnectWallet } = useContext(WalletContext);
  const router = useRouter();
  const currentRoute = router.pathname;

  useEffect(() => {
    prettyAddress(account).then((address) => {
      setAddress(address);
    });
  });

  return (
    <Navbar expand="lg">
      <Container>
        <Link href="/" passHref>
          <Navbar.Brand>
            <img
              src={Logo.src}
              alt="Sesame Foundation"
              height="40px"
              className="me-2"
            />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href="/about" passHref>
              <Nav.Link className={currentRoute === "/about" ? "active" : ""}>
                About
              </Nav.Link>
            </Link>
            <Link href="/terms" passHref>
              <Nav.Link className={currentRoute === "/terms" ? "active" : ""}>
                Terms
              </Nav.Link>
            </Link>
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
}
