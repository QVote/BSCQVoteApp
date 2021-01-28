import { ethers } from 'ethers';
import * as fs from 'fs';

const accPath = `${__dirname}/.privKey`;

try {
    fs.readFileSync(accPath, 'utf8');
    console.log("An account exists");
} catch (e) {
    console.log("The account does not exist, creating new one...");
    const wallet = ethers.Wallet.createRandom();
    fs.writeFileSync(accPath, wallet.privateKey);
}

const privKey = fs.readFileSync(accPath, 'utf8').toString().trim();;

const bscProvider = new ethers.providers.JsonRpcProvider(`https://data-seed-prebsc-1-s1.binance.org:8545`);
const signer = new ethers.Wallet(privKey, bscProvider);

console.log(signer)
export { signer, bscProvider };
