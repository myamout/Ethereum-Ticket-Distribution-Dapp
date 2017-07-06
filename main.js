import Web3 from 'web3';
import contract from 'truffle-contract';
import fs from 'fs';

const web3 = new Web3();
const compiledJson = JSON.parse(fs.readFileSync('build/contracts/Tickets.json'));
const provider = new Web3.providers.HttpProvider("http://localhost:8545");
const contractAddr = fs.readFileSync('contractAddr.txt').toString();

const TicketsContract = contract({
  abi: compiledJson.abi,
  unlinked_binary: compiledJson.unlinked_binary,
});

TicketsContract.setProvider(provider);
web3.setProvider(provider);

// TicketsContract.at(contractAddr).then((instance) => {
//   return instance.createTicket({from: web3.eth.accounts[2], value: web3.toWei(0.08, "ether")});
// }).then((response) => {
//   console.log(response.logs[0]['args']['ticketKey'].toLocaleString());
// }).catch((error) => {
//   console.log(error);
// });

// TicketsContract.at(contractAddr).then((instance) => {
//   return instance.getOwner.call('0x8727b2bd17825c90c81aa4e93e0e0535f74e03d5ae50c23cc64b6532c72e4190');
// }).then((response) => {
//   console.log(response.toLocaleString());
// }).catch((error) => {
//   console.log(error);
// });

TicketsContract.at(contractAddr).then((instance) => {
  return instance.allowPurchase({from: web3.eth.accounts[0]});
}).then((response) => {
  console.log(response.logs[0]['args']['canPurchase']);
}).catch((error) => {
  console.log(error);
});

// TicketsContract.at(contractAddr).then((instance) => {
//   return instance.unlockEther({from: web3.eth.accounts[2]});
// }).then((response) => {
//   console.log(response);
// }).catch((error) => {
//   console.log(error);
// });
