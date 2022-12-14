import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { providerContract, provider } from "../utils/utils";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import DiscordLogo from "../public/Discord-Logo-Black.svg";
import GitHubLogo from "../public/GitHub-Mark-64px.png";
import DonateButton from "../components/DonateButton";
import DonorList from "../components/DonorList";
import Head from "next/head";
import Layout from "../components/Layout";
import Row from "react-bootstrap/Row";
import SolutionSubmissionButton from "../components/SolutionSubmissionButton";
import SolvedBadge from "../components/SolvedBadge";
const bn = require("bn.js");
const MAX_DIGITS = 10;

export default function DecentralizedFactoringChallenge() {
  const [balance, setBalance] = useState(null);
  const [product, setProduct] = useState(null);
  const [winner, setWinner] = useState(null);
  const [withdrawlDelay, setWithdrawlDelay] = useState(null);

  const contractName = "FactoringChallenge";
  const isUnsolved = winner == null || /^0x0+$/.test(winner);

  const copyToClipboard = (content) => {
    var sampleTextarea = document.createElement("textarea");
    document.body.appendChild(sampleTextarea);
    sampleTextarea.value = content;
    sampleTextarea.select();
    document.execCommand("copy");
    document.body.removeChild(sampleTextarea);
  };

  const getFormattedProduct = () => {
    if (product) {
      return product.length > MAX_DIGITS
        ? product.substring(0, MAX_DIGITS) + "..."
        : product;
    } else {
      return "";
    }
  };

  const updateBalance = () => {
    const contract = providerContract(contractName);
    if (contract === undefined) return;
    provider.getBalance(contract.address).then((balance) => {
      const formattedBalance = ethers.utils.formatEther(balance);
      const roundedBalance = Math.round(formattedBalance * 1e6) / 1e6;
      setBalance(roundedBalance);
    });
  };

  const updateProduct = () => {
    const contract = providerContract(contractName);
    if (contract === undefined) return;
    contract.product().then((product) => {
      const truncatedProduct = new bn(product[0].slice(2), 16).toString(10);
      setProduct(truncatedProduct.toString());
    });
  };

  const updateWinner = () => {
    const contract = providerContract(contractName);
    if (contract === undefined) return;
    contract.winner().then((winner) => setWinner(winner.toString()));
  };

  const updateWithdrawlDelay = () => {
    const contract = providerContract(contractName);
    if (contract === undefined) return;
    contract
      .withdrawlDelay()
      .then((withdrawlDelay) => setWithdrawlDelay(withdrawlDelay.toString()));
  };

  const updateSolvedStates = () => {
    updateBalance();
    updateWinner();
  };

  useEffect(() => {
    updateBalance();
    updateProduct();
    updateWinner();
    updateWithdrawlDelay();
  });

  const metaTitle = "Decentralized Factoring Challenge - Sesame Foundation";
  const metaDescription =
    "A decentralized factoring challenge to encourage research in computational number theory.";

  return (
    <Layout>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
      </Head>
      <Row className="px-4 py-5" style={{ backgroundColor: "#f8fbff" }}>
        <Col className="text-center">
          <h1 className="display-5 fw-bold">
            Decentralized Factoring Challenge
          </h1>
          <p className="lead">
            A decentralized factoring challenge to encourage research in
            computational number theory.
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "64px",
            }}
          >
            <SolvedBadge isUnsolved={isUnsolved} />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <a href="https://discord.gg/WWXPmZAsGf">
                <img src={DiscordLogo.src} alt="Discord" width="32px" />
              </a>
              <a href="https://github.com/sesame-foundation/decentralized-factoring-challenge">
                <img src={GitHubLogo.src} alt="GitHub" width="32px" />
              </a>
            </div>
          </div>
        </Col>
      </Row>
      <Container className="factoring-challenge">
        <Row>
          <Col md className="my-5 text-center">
            <h2 className="h4 mb-0">Product</h2>

            <p className="product">{getFormattedProduct()}</p>
            {isUnsolved && (
              <div className="product-buttons">
                <Button
                  variant="primary"
                  onClick={() => copyToClipboard(product)}
                  title="Copy to Clipboard"
                >
                  Copy
                </Button>

                <SolutionSubmissionButton
                  contractName={contractName}
                  withdrawalDelay={withdrawlDelay}
                  onSubmitSolution={updateSolvedStates}
                />
              </div>
            )}
          </Col>
          <Col md className="my-5 text-center">
            <h2 className="h4 mb-0">ETH Prize</h2>
            <p className="product">{balance}</p>
            {isUnsolved && (
              <DonateButton
                contractName={contractName}
                onDonate={updateBalance}
              />
            )}
          </Col>
        </Row>
      </Container>
      <DonorList contractName={contractName} />
    </Layout>
  );
}
