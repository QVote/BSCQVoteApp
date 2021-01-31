import { ethers, Wallet } from 'ethers';
import * as fs from 'fs';

const wallet = Wallet.createRandom();

console.log("ADDRESS")
console.log(wallet.address)
console.log("PIRVKEY")
console.log(wallet.privateKey)
console.log("MEMO")
console.log(wallet.mnemonic)

