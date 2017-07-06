import express from 'express';
import Web3 from 'web3';
import contract from 'truffle-contract';
import fs from 'fs';

const router = express.Router();
const web3 = new Web3();

const compiledJson = JSON.parse(fs.readFileSync('../build/contracts/Tickets.json'));
const provider = new Web3.providers.HttpProvider("http://localhost:8545");
const contractAddr = fs.readFileSync('../contractAddr.txt').toString();
const TicketsContract = contract({
  abi: compiledJson.abi,
  unlinked_binary: compiledJson.unlinked_binary
});

web3.setProvider(provider);
TicketsContract.setProvider(provider);

router.get('/name', (req, res) => {
  TicketsContract.at(contractAddr).then((instance) => {
    return instance.getEventName.call();
  }).then((response) => {
    res.send({resp: response.toLocaleString()});
  }).catch((error) => {
    res.send({error: error});
  });
});

router.get('/pendTicket', (req, res) => {
  if (req['query']['address'] == '' || req['query']['price'] == '') {
    res.send({error: "address is null"});
  } else {
    TicketsContract.at(contractAddr).then((instance) => {
      return instance.createTicket({from: req['query']['address'], value: web3.toWei(0.08, "ether")});
    }).then((response) => {
      res.send({resp: response.logs[0]['args']['ticketKey'].toLocaleString()});
    }).catch((error) => {
      res.send({resp: error});
    });
  }
});

router.get('/pay', (req, res) => {
  if (req['query']['key'] == '' || req['query']['address'] == '') {
    res.send({resp: "Parameter(s) are empty"});
  } else {
    TicketsContract.at(contractAddr).then((instance) => {
      return instance.unlockEther(req['query']['key'], {from: req['query']['address']});
    }).then((response) => {
      res.send({resp: response.logs[0]['args']['paid']});
    }).catch((error) => {
      res.send({resp: error});
    });
  }
});

router.get('/price', (req, res) => {
  TicketsContract.at(contractAddr).then((instance) => {
    return instance.getTicketPrice.call();
  }).then((response) => {
    res.send({resp: web3.fromWei(response.toLocaleString(), 'ether')});
  }).catch((error) => {
    res.send({resp: error});
  });
});

router.get('/paidfor', (req, res) => {
  if (req['query']['key'] == '') {
    res.send({resp: "Parameter(s) are empty"});
  } else {
    TicketsContract.at(contractAddr).then((instance) => {
      return instance.getPaidFor.call(req['query']['key']);
    }).then((response) => {
      res.send({resp: response.toLocaleString()});
    }).catch((error) => {
      res.send({resp: error});
    });
  }
});


module.exports = router; 