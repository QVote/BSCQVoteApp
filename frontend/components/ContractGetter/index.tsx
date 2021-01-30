import { Box, TextInput, Button, Text } from 'grommet';
import { ReactNode, useState } from 'react';
import { ethers } from 'ethers';
import { Checkmark, Close } from 'grommet-icons';

export function ContractGetter({ decision, children, onGetQVoteContract, errTxt, loading }:
    {
        decision: any, children: ReactNode, onGetQVoteContract: (qvoteAddress: string) => any,
        errTxt: string, loading: boolean
    }) {
    const [qvoteAddress, setQvoteAddress] = useState("");
    const [isAddress, setIsAddress] = useState(false);

    function onUpdateAddress(s: string) {
        setIsAddress(ethers.utils.isAddress(s))
        setQvoteAddress(s);
    }

    return (
        <Box fill direction="row" gap="large">
            {
                decision ?
                    children
                    :
                    <Box flex elevation="small" round="small" pad="medium" gap="small">
                        <TextInput
                            icon={isAddress ? <Checkmark /> : <Close />}
                            placeholder="QVote contract address"
                            value={qvoteAddress}
                            maxLength={42}
                            onChange={(e) => onUpdateAddress(e.target.value)}
                        />
                        <Box align="center">
                            <Button disabled={loading && !isAddress} label={"Get QVote contract"} onClick={() => onGetQVoteContract(qvoteAddress)} />
                        </Box>
                        <Box width={{ max: "medium" }} height={{ max: "small" }}>
                            {errTxt &&
                                <Text truncate={true} color={"status-error"}>
                                    {errTxt}
                                </Text>
                            }
                        </Box>
                    </Box>
            }
        </Box>
    )
}