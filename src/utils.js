import { ethers } from "ethers";
import { InjectedConnector } from "@web3-react/injected-connector";
import networkConfig from "./contracts/network-config.json";

const chainIdToNetworkName = new Map([
  [1, "mainnet"],
  [3, "ropsten"],
  [4, "rinkeby"],
  [5, "goerli"],
  [42, "kovan"],
  [1337, "dev"],
]);
export const defaultChainId = parseInt(process.env.REACT_APP_DEFAULT_CHAIN_ID);
export const defaultNetworkName = chainIdToNetworkName.get(defaultChainId);
export const supportedChainIds = [defaultChainId];
export const injected = new InjectedConnector();

// Set provider to chainId network
export const provider =
  defaultChainId !== 1337
    ? ethers.getDefaultProvider(defaultNetworkName)
    : new ethers.providers.JsonRpcProvider();

// Allow provider to be dictated by window.ethereum
// export const provider = window.ethereum
//   ? new ethers.providers.Web3Provider(window.ethereum)
//   : ethers.getDefaultProvider();

export const providerContract = (contractName) => {
  const contractAddress =
    networkConfig[defaultChainId.toString()][contractName];
  const contractDescription = require(`./contracts/${contractName}.json`);
  return new ethers.Contract(
    contractAddress,
    contractDescription.abi,
    provider
  );
};

export async function getSigner() {
  await provider.send("eth_requestAccounts", []);
  return provider.getSigner();
}

export function getSignerContract(contractName, signer) {
  const contractAddress =
    networkConfig[defaultChainId.toString()][contractName];
  const contractDescription = require(`./contracts/${contractName}.json`);
  return new ethers.Contract(contractAddress, contractDescription.abi, signer);
}

export async function prettyAddress(address) {
  if (!address) return "No Account";
  try {
    const ensName = await provider.lookupAddress(address);
    return ensName ? ensName : truncateAddress(address);
  } catch (error) {
    return truncateAddress(address);
  }
}

const truncateAddress = (address) => {
  if (!address) return "No Account";
  const match = address.match(
    /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/
  );
  if (!match) return address;
  return `${match[1]}…${match[2]}`;
};
