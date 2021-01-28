import { ethers } from 'ethers';
import * as fs from 'fs';

const accPath = `${__dirname}/acc.mnemonic`;

try {
    fs.readFileSync(accPath, 'utf8');
    console.log("An account exists");
} catch (e) {
    console.log("The account does not exist, creating new one...");
    const wallet = ethers.Wallet.createRandom();
    fs.writeFileSync(accPath, wallet.mnemonic.phrase);
}

const accFile = fs.readFileSync(accPath, 'utf8');
const wallet = ethers.Wallet.fromMnemonic(accFile);

console.log(wallet);

export { accPath, accFile }
