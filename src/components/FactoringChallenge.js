import React, { Component } from "react";
import { providerContract, provider } from "../utils.js";
import { DonateButton } from "./DonateButton";

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
    this.setState({ balance: balance.toString() });
  }
  render() {
    return (
      <div>
        <p>Product: {this.state.product}</p>
        <p>Withdrawl delay (blocks): {this.state.withdrawlDelay}</p>
        <p>Balance: {this.state.balance}</p>
        <DonateButton onDonate={() => this.updateBalance()} />
      </div>
    );
  }

  updateBalance() {
    provider
      .getBalance(providerContract.address)
      .then((balance) => this.setBalance(balance));
  }

  componentDidMount() {
    providerContract.product().then((product) => this.setProduct(product));

    providerContract
      .withdrawlDelay()
      .then((withdrawlDelay) => this.setWithdrawlDelay(withdrawlDelay));
    this.updateBalance();
  }
}
