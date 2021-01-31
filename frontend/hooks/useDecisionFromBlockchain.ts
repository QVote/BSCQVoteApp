import { ethers, Contract } from 'ethers'
import { useEffect, useState } from 'react'
import { QVBSC } from '../types';
import { abi } from '../config';
import { unConcatStrings, uniqStringToString, getNumberFromBigNum } from '../scripts'

export const useDecisionFromBlockchain = (qvAddress: string, isAddress: boolean, eth: any, voterAddress: string, setDecision: (a: QVBSC.VotingDecision) => any) => {
    const [loading, setLoading] = useState(false);
    const [checked, setChecked] = useState(false);

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
                const res = await qvote.getVotingInfo();
                const c = await qvote.getBalanceOf(voterAddress);
                setDecision(processRes(res, c));
                setLoading(false);
            } catch (e) {
                console.error(e)
            }
            setLoading(false);
        }
        setChecked(true);
    }

    function processRes(r: [string, string, string[]], cre: ethers.BigNumber) {
        const [name, description] = unConcatStrings(r[1]);
        const credits = getNumberFromBigNum(cre)
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
            options
        }
        return res;
    }

    return { loadingDecision: loading, checkedDecision: checked }
}