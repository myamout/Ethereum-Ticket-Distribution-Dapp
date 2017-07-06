# Ethereum Ticket Distribution Smart Contract
Leveraging blockchain's ability to easily validate identity and identify ownership, this smart contract is a simple example of how blockchain can be applied to the ticketing industry. By using the Ethereum blockchain we are able to write a decentralized application that allows the seller to easily validate identities and charge for the tickets. The app allows the buyer to quickly get their ticket and know that it's authentic. 

## The Stack
  - The smart contract was written in Solidity, the language of choice for the Ethereum Virtual Machine.
  - Back-end was written using Node.js and the Express framework.
  - Front-end was written with React in EMCAScript 6 leveraging the Stage Two preset as well.

## How Does Everything Work?
Ethereum has three main blockchain networks: Homestead, Modern, and Testrpc. Homestead is the real blockchain, Modern is the test network, and finally the Testrpc is a private blockchain that can be ran locally for testing. This project uses the Testrpc to run a local blockchain. Once the smart contract is deployed onto the Testrpc, we can create a simply REST API that allows our front-end to interact with the contract through Express.

## Setting Up The Testrpc And Deploying The Contract
  1. Make sure you have NPM and Git installed
  2. Install the Yarn package manager by running `npm install -global yarn` (Note that npm will work fine if you prefer it)
  3. Clone the repo by using `git clone (insert repo here)`
  4. Move into the cloned folder and install the dependencies by running `yarn`
  5. Open a new terminal window, navigate to the project folder, and start the Testrpc by running `yarn testrpc`
  6. Install the Truffle CLI by running `yarn add truffle`
  7. Compile the smart contract by running `truffle compile`
  8. Deploy the smart contract by running `yarn migrate`. This will run the `migrate.js` file
  9. Copy and paste the address location of the contract the Testrpc gives back to the `contractAddr.txt` file so we can access the contract later
  10. You can use some of the predefined methods inside of `main.js` to interact with the contract (some may be commented out, you can uncomment them)

## Running The Dapp
  1. Move into the `dapp/` folder
  2. Run `yarn` to install all of the dependencies
  3. Run `yarn build` to run Webpack and bundle all of the source code
  4. Run `yarn server` and navigate to `localhost:1337` to use the Decentralized Web App!

## Sample REST Call

### Backend
```
router.get('/name', (req, res) => {
  TicketsContract.at(contractAddr).then((instance) => {
    return instance.getEventName.call();
  }).then((response) => {
    res.send({resp: response.toLocaleString()});
  }).catch((error) => {
    res.send({error: error});
  });
});
```
Here is sample backend code that will reterive the name of the event the owner of the contract will pass in as a constructor parameter upon deployment.
The project leverages a node module called `truffle-contract` for interacting with the contract. Truffle-contract allows us to define a contract object and then interact with the deployed contract through promises. 

### Frontend
```
async getTitle() {
    try {
      let response = await fetch(this.state.titleUrl);
      let responseData = await response.json();
      this.setState({
        title: responseData.resp
      });
    } catch(error) {
      console.log(error);
    }
  }
  ```
  Here is simple ajax call from the frontend using an async function, fetch, and await. This serves as a promise as well and easily lets us grab the title of the event and save it to the state.

## The Smart Contract
```
function createTicket() payable notOwner {
    if (msg.value == ticketPrice) {
      pendingTransactions[msg.sender] = msg.value;
      bytes32 hash = sha3(msg.sender);
      tickets[hash] = Ticket(false, msg.sender);
      TicketKey(hash);
    }
  }

  function unlockEther(bytes32 hash) releaseTrue notOwner {
    uint amount = pendingTransactions[msg.sender];
    pendingTransactions[msg.sender] = 0;
    venueOwner.transfer(amount);
    tickets[hash].paidFor = true;
    PaidFor(true);
  }
  ```
  These are two sample functions from our smart contract that serve as the sending of Ether to the contract owner (the event venue). The first contracts allows a customer to reserve a ticket. The address of the buyer and the ticket price is added to a key value map and then a hash key for the ticket is created and sent back to the buyer so they can purchase and access their ticket later. Then once the contract owner flips a boolean flag to allow for ticket purchases the buyer can send purchase their ticket. We split the purchase into two different methods to follow Solidity common conventions. 

  ```
  event TicketKey(bytes32 ticketKey);
  event CanPurchase(bool canPurchase);
  event PaidFor(bool paid);

  modifier onlyOwner() {
    require(msg.sender == venueOwner);
    _;
  }

  modifier notOwner() {
    require(msg.sender != venueOwner);
    _;
  }

  modifier releaseTrue() {
    require(releaseEther);
    _;
  }
  ```
  Some other code we can touch on are the contract's different events and function modifiers. Solidity allows for the developer to write events that can be listened to by Web3.js, the official Ethereum JavaScript API. However, in this project truffle-contract returns the events as well inside of the promise chain. Secondly, Solidity allows for function modifiers. Think of these as an if statement for the entire function. Depending on the use case, the developer has the ability to restrict or permit access to particular functions to users. 

## Conclusion
The Ethereum blockchain has an extremely promising future due to it ability to write use smart contracts to drive transactions and data across the blockchain. This dapp is prime example of how easy it is to integrate blockchain into a common use case. If you would like to jump into the Ethereum blockchain and smart contact develop here is a link to a quick primer guide I wrote that'll be able to get you started!
`https://github.com/myamout/Ethereum_Primer`