import { useState, useContext } from 'react';
import { QVBSC } from '../../types';
import { Voter } from './Voter'
import { getInitDecision } from '../DecisionCreator/script'
import { GlobalContext } from '../GlobalContext';
import { Text } from 'grommet';


export function DecisionVoter() {
    const [decision, setDecision] = useState<QVBSC.VotingDecision | undefined>({ ...getInitDecision(), options: [{ uid: "3242", optName: "somethign", cur: 0, min: 0, max: 100 }, { uid: "322342", optName: "somethignelse", cur: 0, min: 0, max: 100 }], credits: 100, creditsRemaining: 100 });
    const [errTxt, setErrTxt] = useState("");
    const [loading, setLoading] = useState(false);
    const g = useContext(GlobalContext);

    //get contract here and call it set it etc

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
        decision ?
            <Voter d={decision} setDecision={setDecision} />
            :
            <Text>{"Loading..."}</Text>
    )
}