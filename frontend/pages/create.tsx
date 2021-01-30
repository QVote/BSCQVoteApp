import { QVBSC } from '../types'
import { DecisionCreator } from '../components/DecisionCreator';

function addMinutes(passToConstructor: any, m: number) {
    const res = new Date(passToConstructor);
    res.setTime(res.getTime() + m * 60 * 1000);
    return res;
}

function getInitDecision(): QVBSC.Decision {
    const end = addMinutes(new Date(Date.now()), 10);
    return {
        name: "",
        description: "",
        options: [],
        endTime: end.getTime()
    }
}

export default function Create() {
    return (
        <DecisionCreator initDecision={getInitDecision()} />
    )
}