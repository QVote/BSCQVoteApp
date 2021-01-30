import { useState } from 'react';
import { QVBSC } from '../../types';
import { Voter } from './Voter'
import { getInitDecision } from '../DecisionCreator/script'
import { ContractGetter } from '../ContractGetter';

export function DecisionVoter() {
    const [decision, setDecision] = useState<QVBSC.VotingDecision | undefined>({ ...getInitDecision(), options: [{ uid: "3242", optName: "somethign", cur: 0, min: 0, max: 100 }, { uid: "322342", optName: "somethignelse", cur: 0, min: 0, max: 100 }], credits: 100, creditsRemaining: 100 });
    const [errTxt, setErrTxt] = useState("");
    const [loading, setLoading] = useState(false);

    function onGetQVoteContract() {
        if (!loading) {
            try {
                setErrTxt("");
                setLoading(true);
                //setDecision({})
                setLoading(false);
            } catch (e) {
                setErrTxt(e);
                setLoading(false);
            }
        }
    }

    return (
        <ContractGetter decision={decision} loading={loading} errTxt={errTxt} onGetQVoteContract={onGetQVoteContract}>
            <Voter d={decision} setDecision={setDecision} />
        </ContractGetter>
    )
}