const Web3 = require("web3");
// const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
const web3 = new Web3("ws://localhost:8545");

const contractDescription = require("./contract.json");

console.log("Contract address");
console.log(process.env.CONTRACT_ADDRESS);
export const contract = new web3.eth.Contract(
  contractDescription.abi,
  "0x5FbDB2315678afecb367f032d93F642f64180aa3"
  //   process.env.CONTRACT_ADDRESS
);
