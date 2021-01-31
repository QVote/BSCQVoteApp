import { Box, TextInput } from 'grommet';
import { ethers } from 'ethers';
import { Checkmark, Close } from 'grommet-icons';

export function WithQVoteContractAddress({ qvoteAddress, setQvoteAddress, isAddress, setIsAddress }) {

    function onUpdateAddress(s: string) {
        setIsAddress(ethers.utils.isAddress(s))
        setQvoteAddress(s);
    }

    return (
        <Box align="center" width={{min:"medium"}}>
            <TextInput
                icon={isAddress ? <Checkmark /> : <Close />}
                placeholder="QVote contract address"
                value={qvoteAddress}
                maxLength={42}
                onChange={(e) => onUpdateAddress(e.target.value)}
            />
        </Box >
    )
}