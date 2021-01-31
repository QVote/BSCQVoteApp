import { Box } from 'grommet';
import { MutableRefObject, useState } from 'react';
import _config from '../../config';
import { Context } from '../GlobalContext';
import { WithQVoteContractAddress } from '../WithQVoteContractAddress';

export const ConnectedInterface = ({ accounts, eth, children }:
    {
        accounts: string[],
        eth: MutableRefObject<any>,
        children: React.ReactNode
    }) => {
    const [qvoteAddress, setQvoteAddress] = useState("");
    const [isAddress, setIsAddress] = useState(false);
    const [isQVContract, setIsQVContract] = useState(false);
    //todo
    //this is stupid
    return (
        <Box fill gap="small" align="center">
            <WithQVoteContractAddress qvoteAddress={qvoteAddress} setQvoteAddress={setQvoteAddress}
                isAddress={isAddress} setIsAddress={setIsAddress} />
            <Context accounts={accounts} eth={eth} qvoteAddress={qvoteAddress} isAddress={isAddress} isQVContract={isQVContract}>
                {children}
            </Context>
        </Box>
    )
}