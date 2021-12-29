import { ethers } from "ethers";
export const provider = new ethers.providers.JsonRpcProvider();
export const signer = provider.getSigner();

const contractDescription = require("./contract.json");

console.log("Contract address");
console.log(process.env.CONTRACT_ADDRESS);
export const providerContract = new ethers.Contract(
  "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  contractDescription.abi,
  provider
);
export const signerContract = new ethers.Contract(
  "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  contractDescription.abi,
  signer
);
