import React, { Component } from "react";
import { contract } from "../utils.js";

export class FactoringChallenge extends React.Component {
  constructor(props) {
    super(props);
    this.state = { product: null, withdrawlDelay: null };
  }
  setProduct(product) {
    this.setState({ product: product });
  }
  setWithDrawlDelay(withdrawlDelay) {
    this.setState({ withdrawlDelay: withdrawlDelay });
  }
  render() {
    return (
      <div>
        <p>Product: {this.state.product}</p>
        <p>Withdrawl delay (blocks): {this.state.withdrawlDelay}</p>
      </div>
    );
  }

  componentDidMount() {
    contract.methods
      .product()
      .call()
      .then((product) => this.setProduct(product));

    contract.methods
      .withdrawlDelay()
      .call()
      .then((withdrawlDelay) => this.setWithDrawlDelay(withdrawlDelay));
  }
}
