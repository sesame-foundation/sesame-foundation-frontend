import React from "react";
import { providerContract, provider } from "../utils.js";
import { DonateButton } from "./DonateButton";
import { SolutionSubmissionButton } from "./SolutionSubmissionButton";
import { ethers } from "ethers";
const bn = require("bn.js");

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
  render() {
    return (
      <div class="container">
        <div class="row">
          <div class="col-sm">
            <p>Product: {this.state.product}</p>
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
