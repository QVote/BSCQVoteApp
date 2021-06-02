# QVoteBSC :eyes:

## What am I 
QVote is a quadratic voting platform on blockchain. This repo contains QVote's implementation on the Binance Smart Chain.  :technologist: 

## How to use the app
The app works with the metamask wallet. You need a funded account in the Binance Smart Chain network
You can create a decision in the 'Create' section. The decision gets deployed to the Binance Smart Chain as a smart contract. Save it's address and give it to the voters to vote. 
You can then mint credits to the addresses of the voters in your decision.
These credits are spent quadratically during the decision https://towardsdatascience.com/what-is-quadratic-voting-4f81805d5a06.

To vote on an decision, search for the smart contract by pasting its address in the vote section.
In the same way, once the decision has terninated you can view the results. 


## How to use this code 

to deploy
 ```bash
truffle migrate --network testnet
 ```
to get instance of contract
  ```bash
truffle console --network testnet
const instance = await QVoting.deployed()
const accounts = await web3.eth.getAccounts()
 ```

mint account
```bash
await instance.mint(accounts[0], 100)
```

vote
```bash
await instance.vote(["0x6162636400000000000000000000000000000000000000000000000000000000"], [50])
```

get results
```bash
await instance.getResults()

