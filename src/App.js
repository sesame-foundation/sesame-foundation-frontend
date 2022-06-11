import "./App.css";
import { FactoringChallenge } from "./components/FactoringChallenge.js";
import About from "./components/About.js";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Logo from "./logo.png";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Terms from "./components/Terms.js";
import Web3Modal, { providers } from "web3modal";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ethers } from "ethers";
import { LinkContainer } from "react-router-bootstrap";
import { useState, useEffect } from "react";
import { truncateAddress } from "./utils.js";

let providerOptions = {};
if (!window.ethereum) {
  providerOptions["custom-metamask"] = {
    display: {
      logo: providers.METAMASK.logo,
      name: "Install MetaMask",
      description: "Connect using browser wallet",
    },
    package: {},
    connector: async () => {
      window.open("https://metamask.io");
      throw new Error("MetaMask not installed");
    },
  };
}

const web3Modal = new Web3Modal({
  cacheProvider: true,
  providerOptions,
});

function App() {
  const [provider, setProvider] = useState();
  const [account, setAccount] = useState();
  const [chainId, setChainId] = useState();

  useEffect(() => {
    if (web3Modal && web3Modal.cachedProvider) {
      connectWallet();
    }
  }, [web3Modal]);

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        if (accounts) setAccount(accounts[0]);
      };

      const handleChainChanged = (_hexChainId) => {
        setChainId(_hexChainId);
      };

      const handleDisconnect = () => {
        disconnectWallet();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider]);

  const connectWallet = async () => {
    try {
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      const accounts = await library.listAccounts();
      const network = await library.getNetwork();
      setProvider(provider);
      if (accounts) setAccount(accounts[0]);
      setChainId(network.chainId);
    } catch (error) {
      console.log(error);
    }
  };

  const disconnectWallet = async () => {
    await web3Modal.clearCachedProvider();
    refreshState();
  };

  const refreshState = () => {
    setAccount();
    setChainId();
  };

  return (
    <BrowserRouter>
      <div className="App">
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
              <Nav activeKey={window.location.pathname}>
                <LinkContainer to="/about">
                  <Nav.Link>About</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/terms">
                  <Nav.Link>Terms</Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
            <div>
              {!account ? (
                <Button variant="primary" onClick={() => connectWallet()}>
                  Connect Wallet
                </Button>
              ) : (
                <Button variant="secondary" onClick={() => disconnectWallet()}>
                  {truncateAddress(account)}
                </Button>
              )}
            </div>
          </Container>
        </Navbar>
        <div className="App-body">
          <Routes>
            <Route path="/" element={<Navigate replace to="/dfc" />} />
            <Route
              path="dfc"
              element={
                <FactoringChallenge
                  account={account}
                  connectWallet={connectWallet}
                />
              }
            />
            <Route path="about" element={<About />} />
            <Route path="terms" element={<Terms />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
