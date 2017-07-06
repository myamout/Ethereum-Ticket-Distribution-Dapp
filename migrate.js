import Web3 from 'web3';
import fs from 'fs';

const web3 = new Web3();
const provider = new Web3.providers.HttpProvider("http://localhost:8545");
const compiledJson = JSON.parse(fs.readFileSync('build/contracts/Tickets.json'));

web3.setProvider(provider);

console.log('Migrating Tickets Contract...');
try {
  const TicketsContract = web3.eth.contract(compiledJson.abi);
  const deployedContract = TicketsContract.new(web3.toWei(0.08, "ether"), "Cool EDM Festival", {data: compiledJson.unlinked_binary, from: web3.eth.accounts[0], gas: 4700000});
  console.log('Contract Deployed Successfully...');
} catch (error) {
  console.log(error);
  console.log('Migration Failed...');
}
