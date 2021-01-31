import { abi, bytecode } from './QVoting.json'

const _config = {
    NETWORK_NAME: "Binance Smart Chain Testnet",
    RPC_URL: "https://data-seed-prebsc-1-s1.binance.org:8545/",
    CHAIN_ID: "97",
    ERRORS: {
        WRONG_CHAIN: "WRONG_CHAIN",
    }
}

export { abi, bytecode };
export default _config;