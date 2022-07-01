import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ethers } from "ethers";
import {
  contractAddress,
  defaultChainId,
  defaultNetworkName,
  prettyAddress,
} from "../utils/utils.js";

export default function DonationItem({ contractName, donation }) {
  const [address, setAddress] = useState(null);

  useEffect(() => {
    prettyAddress(donation.donor).then((address) => {
      setAddress(address);
    });
  });

  const etherscanAddress = (donation) => {
    const baseUri = "etherscan.io";
    const path = "/address/";
    const contract = contractAddress(contractName);
    switch (defaultChainId) {
      case 1: {
        return `https://${baseUri}${path}${contract}?fromaddress=${donation.donor}`;
      }
      case 3:
      case 4:
      case 5:
      case 42: {
        return `https://${defaultNetworkName}.${baseUri}${path}${contract}?fromaddress=${donation.donor}`;
      }
      default: {
        return null;
      }
    }
  };

  return (
    <tr>
      <td>
        {etherscanAddress ? (
          <a
            target="_blank"
            href={etherscanAddress(donation)}
            rel="noopener noreferrer"
          >
            {address}
          </a>
        ) : (
          { address }
        )}
      </td>
      <td style={{ textAlign: "right" }}>
        {ethers.utils.formatEther(donation.value)}
      </td>
    </tr>
  );
}
