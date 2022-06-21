import { ethers } from "ethers";
import { InjectedConnector } from "@web3-react/injected-connector";
import networkConfig from "./contracts/network-config.json";

export const supportedChainIds = [
  parseInt(process.env.REACT_APP_DEFAULT_CHAIN_ID),
];
export const injected = new InjectedConnector();

export const provider = window.ethereum
  ? new ethers.providers.Web3Provider(window.ethereum, "any")
  : ethers.getDefaultProvider();

export const providerContract = (chainId, contractName) => {
  if (chainId === undefined || !supportedChainIds.includes(chainId)) return;
  const contractAddress = networkConfig[chainId][contractName];
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

export function getSignerContract(chainId, contractName, signer) {
  if (chainId === undefined || !supportedChainIds.includes(chainId)) return;
  const contractAddress = networkConfig[chainId][contractName];
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
