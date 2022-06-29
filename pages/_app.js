import "../styles/styles.css";
import App from "../components/App";
import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";

function getLibrary(provider) {
  return new Web3Provider(provider);
}

function MyApp({ Component, pageProps }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <App Component={Component} pageProps={pageProps} />
    </Web3ReactProvider>
  );
}

export default MyApp;
