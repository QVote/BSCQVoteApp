import { abi, bytecode } from '../build/contracts/QVoting.json'
require('dotenv').config()
import { ethers, Contract, Wallet, ContractFactory } from 'ethers'
import * as truffleConfig from '../truffle-config';


// owner 
// const memo = "become reflect flag betray toast panda robot draft carbon select term electric"
// const wallet = Wallet.fromMnemonic(memo);


const voterWallet = Wallet.createRandom();  // voter 

const bscProvider = new ethers.providers.JsonRpcProvider(`https://data-seed-prebsc-1-s1.binance.org:8545`);
const voterSigner = new Wallet(voterWallet.privateKey, bscProvider)


async function getElection(electionAddress: string, voterAddress: string) {
    try {
        const electionContract = new ethers.Contract(electionAddress, abi, voterSigner);
        const balance: number = await electionContract.getBalanceOf(voterAddress);

        if (balance > 0) {
            return electionContract;
        } else {
            return null;
        }

    } catch (e) {
        console.log(e)
    }

}

async function vote(electionAddress: string, voterAddress: string, options: string[], credits: number[]) {
    try {
        const electionContract = getElection(electionAddress, voterAddress).then(contract => {
            let voteResp = contract.vote(
                options.map(ethers.utils.formatBytes32String), credits
            )
            console.log(voteResp)
        })
    } catch (e) {
        console.log(e)
    }
}

async function getElectionData(electionContract: any, voterAddress: string) {
    try {
        const electionInfo: any = await electionContract.getVotingInfo(voterAddress);
        console.log(electionInfo)
    } catch (e) {
        console.log(e);
    }
}
