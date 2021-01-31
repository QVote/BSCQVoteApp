import { abi } from '../build/contracts/QVoting.json'
require('dotenv').config()
import { ethers, Contract, Wallet } from 'ethers'
import * as truffleConfig from '../truffle-config';

const wallet = ethers.Wallet.createRandom({});
wallet.privateKey

export const bscProvider = new ethers.providers.JsonRpcProvider(`https://data-seed-prebsc-1-s1.binance.org:8545`);
const signer = new Wallet(process.env.PRIVATE_KEY, bscProvider)

const contractAddress = "0x521c534fedc8209D20399068A213846Fc8990d92"
const arbFaucet = new Contract(contractAddress, abi, signer);


const testClaimer = new Wallet("be1d0bf52c3f6ce29f13674b26dbaf143ad87629700ae220058bab4c158ea7cc", bscProvider)
const claimerArbFaucet = new Contract(contractAddress, abi, testClaimer);

const addToken = async (address: string) => {
    const res = await arbFaucet.addToken(address)
    const rec = await res.wait()
    console.log('rec');
}

const testClaim = async () => {
    const res = await claimerArbFaucet.claim()
    const rec = await res.wait()
    console.log(rec);

}

(async () => {
    const res = await bscProvider.getBalance(contractAddress)
    console.log("Faucet Eth Balance", res.toString());


})()
