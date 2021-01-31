import { ethers, Contract } from 'ethers'
import { useEffect, useState } from 'react'
import { QVBSC } from '../types';
import { abi } from '../config';
import { unConcatStrings, uniqStringToString } from '../scripts'

export const useDecisionFromBlockchain = (qvAddress: string, isAddress: boolean, eth: any, voterAddress: string, setDecision: (a: QVBSC.VotingDecision) => any) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isAddress) {
            getDecision();
        }
    }, [qvAddress, isAddress])

    async function getDecision() {
        if (!loading) {
            try {
                setLoading(true)
                const provider = new ethers.providers.Web3Provider(eth.current)
                const qvote = new Contract(qvAddress, abi, provider.getSigner());
                const res = await qvote.getVotingInfo(voterAddress);
                const c = await qvote.getBalanceOf(voterAddress);
                setDecision(processRes(res, c));
                setLoading(false);
            } catch (e) {
                console.error(e)
            }
            setLoading(false);
        }
    }

    function processRes(r: [string, string, string[]], cre: ethers.BigNumber) {
        const [name, description] = unConcatStrings(r[1]);
        const credits = parseInt(ethers.BigNumber.from(cre).toString())
        const options = r[2].map(ethers.utils.parseBytes32String).map(i => {
            const [uid, optName] = uniqStringToString(i);
            const op: QVBSC.SliderState = {
                max: credits,
                min: 0,
                optName,
                uid,
                cur: 0
            }
            return op;
        })
        const res: QVBSC.VotingDecision = {
            name,
            description,
            credits,
            creditsRemaining: credits,
            endTime: 0,
            options
        }
        return res;
    }

    return { loadingDecision: loading }
}