import { TextInput, Box, Button } from 'grommet'
import { useState } from 'react'
import { Checkmark, Close } from 'grommet-icons'
import { ethers } from 'ethers';

export default function Mint() {
    const [isAddress, setIsAddress] = useState(false);
    const [voterAddress, setVoterAddress] = useState("");
    const [loading, setLoading] = useState(false)

    function onUpdateAddress(s: string) {
        setIsAddress(ethers.utils.isAddress(s))
        setVoterAddress(s);
    }

    async function onMintVotes() {
        if (!loading) {
            try {
                setLoading(true)


                setLoading(false)
            } catch (e) {
                setLoading(false)
            }
        }
    }

    return (
        <Box align="center" width={{ min: "medium" }} gap="small">
            <TextInput
                icon={isAddress ? <Checkmark /> : <Close />}
                placeholder="Voter address"
                value={voterAddress}
                maxLength={42}
                onChange={(e) => onUpdateAddress(e.target.value)}
            />
            {isAddress &&
                <Button disabled={loading} label="Mint Votes" onClick={onMintVotes} />
            }
        </Box>
    )
}