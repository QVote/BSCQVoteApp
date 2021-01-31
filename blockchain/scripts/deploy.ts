import { abi, bytecode } from '../build/contracts/QVoting.json'
require('dotenv').config()
import { ethers, Contract, Wallet, ContractFactory } from 'ethers'
import * as truffleConfig from '../truffle-config';


const memo = "become reflect flag betray toast panda robot draft carbon select term electric"
const wallet = Wallet.fromMnemonic(memo);

const bscProvider = new ethers.providers.JsonRpcProvider(`https://data-seed-prebsc-1-s1.binance.org:8545`);
const signer = new Wallet(wallet.privateKey, bscProvider)


async function deploy(company: string, election: string, options: string[], expirationMin: number) {
    // Create an instance of a Contract Factory
    const factory = new ContractFactory(abi, bytecode, signer);

    try {
        const contract = await factory.deploy(
            company,
            election,
            options.map(ethers.utils.formatBytes32String),
            expirationMin);

        let address = contract.address

        console.log(address);
        console.log(contract.deployTransaction.hash);

        contract.deployTransaction.wait()
    } catch (error) {
        console.log(error)
    }
}

deploy("somecompany", "mye", ["option1", "yomama"], 1300)
