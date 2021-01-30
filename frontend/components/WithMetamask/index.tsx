import { Heading, Box, Image } from 'grommet';
import { useEth } from '../../hooks/useEth'
import { ConnectToWallet } from './ConnectToWallet';
import _config from '../../config';

export function WithMetamask({ children }: { children: React.ReactNode }) {
    const { loadingProvider, thereIsAProvider, eth } = useEth();

    return (
        <Box align="center" fill pad="large" gap="small">
            <Heading margin="none">{"QVote on Binance Smart Chain"}</Heading>
            {
                thereIsAProvider && !loadingProvider ?
                    <ConnectToWallet eth={eth} children={children} />
                    :
                    <Heading>{"Please install a wallet first"}</Heading>
            }
        </Box >
    );
}