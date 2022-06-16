import "./App.css";
import { FactoringChallenge } from "./components/FactoringChallenge.js";
import { Header } from "./components/Header.js";
import About from "./components/About.js";
import Terms from "./components/Terms.js";
import Web3Modal, { providers } from "web3modal";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ethers } from "ethers";
import { useState, useEffect, useCallback } from "react";
import { WalletContext } from "./contexts/WalletContext";

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

  const disconnectWallet = useCallback(async () => {
    await web3Modal.clearCachedProvider();
    setAccount();
    setChainId();
  }, []);

  useEffect(() => {
    if (web3Modal && web3Modal.cachedProvider) {
      connectWallet();
    }
  });

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        if (accounts) setAccount(accounts[0]);
      };

      const handleChainChanged = (_hexChainId) => {
        setChainId(_hexChainId);
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", disconnectWallet);

      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", disconnectWallet);
        }
      };
    }
  }, [provider, disconnectWallet]);

  return (
    <BrowserRouter>
      <div className="App">
        <WalletContext.Provider
          value={{ account, connectWallet, disconnectWallet }}
        >
          <Header />
          <div className="App-body">
            <Routes>
              <Route path="/" element={<Navigate replace to="/dfc" />} />
              <Route path="dfc" element={<FactoringChallenge />} />
              <Route path="about" element={<About />} />
              <Route path="terms" element={<Terms />} />
              <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
          </div>
        </WalletContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
