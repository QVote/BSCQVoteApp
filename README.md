# hi

to deploy
 ```bash
truffle migrate --network testnet
 ```

to get instance of contract
  ```bash
truffle console --network testnet
let instance = await QVoting.deployed()
let accounts = await web3.eth.getAccounts()
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
```