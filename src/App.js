import "./App.css";
import { FactoringChallenge } from "./components/FactoringChallenge.js";
import { Header } from "./components/Header.js";
import About from "./components/About.js";
import Terms from "./components/Terms.js";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { injected } from "./utils.js";
import { useEffect } from "react";
import {
  UserRejectedRequestError,
  NoEthereumProviderError,
} from "@web3-react/injected-connector";
import { useWeb3React } from "@web3-react/core";
import { WalletContext } from "./contexts/WalletContext";

function App() {
  const { active, activate, deactivate, error, setError } = useWeb3React();
  const connectedStorageKey = "connected";
  var isConnected = localStorage.getItem(connectedStorageKey);

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

    isConnected = localStorage.setItem(connectedStorageKey, true);
  };

  const disconnectWallet = () => {
    deactivate();
    localStorage.removeItem(connectedStorageKey);
  };

  useEffect(() => {
    if (isConnected != null) {
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

  return (
    <BrowserRouter>
      <WalletContext.Provider value={{ connectWallet, disconnectWallet }}>
        <div className="App">
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
        </div>
      </WalletContext.Provider>
    </BrowserRouter>
  );
}

export default App;
