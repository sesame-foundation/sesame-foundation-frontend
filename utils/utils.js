import { ethers } from "ethers";
import { InjectedConnector } from "@web3-react/injected-connector";
import networkConfig from "../contracts/network-config.json";

const devChainId = 1337;
const chainIdToNetworkName = new Map([
  [1, "mainnet"],
  [3, "ropsten"],
  [4, "rinkeby"],
  [5, "goerli"],
  [42, "kovan"],
  [devChainId, "dev"],
]);
export const defaultChainId = parseInt(
  process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID
);
export const defaultNetworkName = chainIdToNetworkName.get(defaultChainId);
export const supportedChainIds = [defaultChainId];
export const injected = new InjectedConnector();

// Allow provider to be dictated by window.ethereum
const devProvider =
  typeof window !== "undefined" && window.ethereum
    ? new ethers.providers.Web3Provider(window.ethereum)
    : new ethers.providers.JsonRpcProvider();

// Set provider to chainId network, unless it's a dev env
export const provider =
  defaultChainId !== devChainId
    ? new ethers.providers.InfuraProvider(
        defaultNetworkName,
        process.env.NEXT_PUBLIC_INFURA_PROJECT_ID
      )
    : devProvider;

export const providerContract = (contractName) => {
  const contractAddress =
    networkConfig[defaultChainId.toString()][contractName];
  const contractDescription = require(`../contracts/${contractName}.json`);
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
  const contractDescription = require(`../contracts/${contractName}.json`);
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
