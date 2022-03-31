import React from "react";
import { providerContract, provider } from "../utils.js";
import { DonateButton } from "./DonateButton";
import { SolutionSubmissionButton } from "./SolutionSubmissionButton";
import { ethers } from "ethers";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import "./FactoringChallenge.css";
const bn = require("bn.js");
const MAX_DIGITS = 10;

function copyToClipboard(content) {
  var sampleTextarea = document.createElement("textarea");
  document.body.appendChild(sampleTextarea);
  sampleTextarea.value = content;
  sampleTextarea.select();
  document.execCommand("copy");
  document.body.removeChild(sampleTextarea);
}

export class FactoringChallenge extends React.Component {
  constructor(props) {
    super(props);
    this.state = { product: null, withdrawlDelay: null, balance: null };
  }

  setProduct(product) {
    this.setState({ product: product.toString() });
  }

  setWithdrawlDelay(withdrawlDelay) {
    this.setState({ withdrawlDelay: withdrawlDelay.toString() });
  }

  setBalance(balance) {
    this.setState({ balance: ethers.utils.formatEther(balance) });
  }

  getFormattedProduct() {
    if (this.state.product) {
      return this.state.product.length > MAX_DIGITS
        ? this.state.product.substring(0, MAX_DIGITS) + "..."
        : this.state.product;
    } else {
      return "";
    }
  }

  handleCopy() {
    copyToClipboard(this.state.product);
  }

  render() {
    return (
      <Container className="factoring-challenge">
        <Row className="px-4 my-5">
          <Col>
            <h1 className="display-5 fw-bold">
              Decentralized Factoring Challenge
            </h1>
            <p className="lead">
              A decentralized factoring challenge to encourage research in
              computational number theory.
            </p>
            <Badge bg="secondary">
              Status: Unsolved
            </Badge>
          </Col>
        </Row>
        <Row>
          <Col md className="my-5">
            <h2 className="h4 mb-0">
              Product
            </h2>

            <p className="product">
              {this.getFormattedProduct()}
            </p>
            <div
              style={{ display: "flex", gap: "10px", justifyContent: "center" }}
            >
              <Button
                variant="primary"
                onClick={() => this.handleCopy()}
                title="Copy to Clipboard"
              >
                Copy
              </Button>
              <SolutionSubmissionButton
                withdrawalDelay={this.state.withdrawlDelay}
                onSubmitSolution={() => this.updateBalance()}
              />
            </div>
          </Col>
          <Col md className="my-5">
            <h2 className="h4 mb-0">
              ETH Prize
            </h2>
            <p className="product">
              {this.state.balance}
            </p>
            <DonateButton onDonate={() => this.updateBalance()} />
          </Col>
        </Row>
      </Container>
    );
  }

  updateBalance() {
    provider
      .getBalance(providerContract.address)
      .then((balance) => this.setBalance(balance));
  }

  componentDidMount() {
    providerContract.product().then((product) => {
      this.setProduct(new bn(product[0].slice(2), 16).toString(10));
    });

    providerContract
      .withdrawlDelay()
      .then((withdrawlDelay) => this.setWithdrawlDelay(withdrawlDelay));
    this.updateBalance();
  }
}
