import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import { useWeb3React } from "@web3-react/core";
import { supportedChainIds } from "../utils.js";
import { WalletContext } from "../contexts/WalletContext";

export const ConnectWalletButton = ({ children }) => {
  const { connectWallet } = useContext(WalletContext);
  const { active, chainId } = useWeb3React();

  return (
    <div>
      {supportedChainIds.includes(chainId) || chainId === undefined ? (
        active ? (
          children
        ) : (
          <Button variant="primary" onClick={() => connectWallet()}>
            Connect Wallet
          </Button>
        )
      ) : (
        <Button variant="danger" disabled>
          Wrong Network
        </Button>
      )}
    </div>
  );
};
