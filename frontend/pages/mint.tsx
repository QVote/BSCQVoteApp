import { TextInput, Box, Button, Text, RangeInput } from 'grommet'
import { useState, useContext } from 'react'
import { Checkmark, Close } from 'grommet-icons'
import { ethers, Contract } from 'ethers';
import { GlobalContext } from '../components/GlobalContext'
import { abi } from '../config'

export default function Mint() {
    const [isAddress, setIsAddress] = useState(false);
    const [voterAddress, setVoterAddress] = useState("");
    const [loading, setLoading] = useState(false)
    const [errTxt, setErrTxt] = useState("")
    const [voterCredits, setVoterCredits] = useState(100);
    const [success, setSuccess] = useState("");
    const g = useContext(GlobalContext);

    function onUpdateAddress(s: string) {
        setIsAddress(ethers.utils.isAddress(s))
        setVoterAddress(s);
    }

    async function onMintVotes() {
        if (!loading) {
            try {
                setLoading(true)
                setSuccess("")
                setErrTxt("")
                const provider = new ethers.providers.Web3Provider(g.eth.current)
                const qvote = new Contract(g.qvoteAddress, abi, provider.getSigner());
                const res = await qvote.mint(voterAddress, voterCredits);
                const res2 = await res.wait()
                if (res2.status == 1) {
                    setSuccess("Success!");
                }
                setLoading(false)
            } catch (e) {
                setLoading(false)
                setErrTxt(e.message)
            }
        }
    }

    return (
        <Box align="center" width={{ min: "530px" }} gap="small"
            animation={[
                { type: "fadeIn", duration: 1000 },
                { type: "slideLeft", duration: 1000 },
            ]}>
            <TextInput
                icon={isAddress ? <Checkmark /> : <Close />}
                placeholder="Voter address"
                value={voterAddress}
                maxLength={42}
                onChange={(e) => onUpdateAddress(e.target.value)}
            />
            <Text weight="bold">{`Credits: ${voterCredits}`}</Text>
            <RangeInput
                value={voterCredits}
                min={1}
                max={1000}
                step={1}
                onChange={(e) => setVoterCredits(parseInt(e.target.value))}
            />
            {isAddress &&
                <Button disabled={loading} label="Mint Votes" onClick={onMintVotes} />
            }
            {success != "" &&
                <Box>
                    <Text truncate={true} color={"status-ok"}>
                        {success}
                    </Text>
                </Box>
            }
            {errTxt != "" &&
                <Box>
                    <Text truncate={true} color={"status-error"}>
                        {errTxt}
                    </Text>
                </Box>
            }
        </Box>
    )
}