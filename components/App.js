import { useEffect, useState } from "react";
import { InjectedConnector } from "@web3-react/injected-connector";
import {
  UserRejectedRequestError,
  NoEthereumProviderError,
} from "@web3-react/injected-connector";
import { useWeb3React } from "@web3-react/core";
import { WalletContext } from "../contexts/WalletContext";

export default function App({ Component, pageProps }) {
  const [isConnected, setIsConnected] = useState(null);
  const { active, activate, deactivate, error, setError } = useWeb3React();
  const connectedStorageKey = "connected";
  const injected = new InjectedConnector();

  const connectWallet = async () => {
    await activate(
      injected,
      (error) => {
        if (error instanceof NoEthereumProviderError) {
          console.log("Metamask not installed");
          window.open("https://metamask.io", "_blank");
        } else if (error instanceof UserRejectedRequestError) {
          console.log("User rejected");
        } else {
          console.log(error);
          setError(error);
        }
      },
      false
    );

    if (typeof window !== "undefined") {
      setIsConnected(localStorage.setItem(connectedStorageKey, true));
    }
  };

  const disconnectWallet = () => {
    deactivate();
    if (typeof window !== "undefined") {
      localStorage.removeItem(connectedStorageKey);
      setIsConnected(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
    }
  });

  useEffect(() => {
    if (isConnected != null && isConnected && !active) {
      injected
        .isAuthorized()
        .then((isAuthorized) => {
          if (isAuthorized && !active && !error) {
            activate(injected);
          }
        })
        .catch(() => {});
    }
  }, [active, activate, error, isConnected]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsConnected(localStorage.getItem(connectedStorageKey));
    }
  });

  return (
    <WalletContext.Provider value={{ connectWallet, disconnectWallet }}>
      <Component {...pageProps} />
    </WalletContext.Provider>
  );
}
