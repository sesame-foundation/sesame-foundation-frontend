import React from "react";
import { providerContract, provider } from "../utils.js";
import { DonateButton } from "./DonateButton";
import { SolutionSubmissionButton } from "./SolutionSubmissionButton";
import { ethers } from "ethers";
import Button from "react-bootstrap/Button";
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
      <div class="container">
        <div class="row">
          <div class="col-sm">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div>Product: {this.getFormattedProduct()}</div>
              <Button variant="primary" onClick={() => this.handleCopy()}>
                Copy
              </Button>
            </div>
            <p>Withdrawl delay (blocks): {this.state.withdrawlDelay}</p>
            <p>Balance: {this.state.balance}</p>
            <div
              style={{ display: "flex", gap: "10px", justifyContent: "center" }}
            >
              <DonateButton onDonate={() => this.updateBalance()} />
              <SolutionSubmissionButton
                onSubmitSolution={() => this.updateBalance()}
              />
            </div>
          </div>
        </div>
      </div>
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
