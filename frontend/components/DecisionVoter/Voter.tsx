import { QVBSC } from "../../types";
import { Box, Button, Heading } from 'grommet';
import { SliderModal } from './SliderModal';
import { useState } from "react";
import { intPls } from './utill'
import PosWithMeters from './PosWithMeters'
import Meters from './Meters'

function CreditsLeft({ left, max }) {
    return (
        <>
            <Box height={{ min: "20px", max: "100px" }}
                align="center" pad={{ bottom: "medium" }}>
                <Heading
                    responsive={false}
                    textAlign="center"
                    level="2"
                    size="small"
                >{`Credits Left: ${left}`}</Heading>
                <Meters
                    credits={left}
                    maxCredits={max}
                    onlyPos
                />
            </Box>
        </>
    )
}


export function Voter({ d, setDecision }:
    { d: QVBSC.VotingDecision, setDecision: (d: QVBSC.VotingDecision) => any }) {
    const [showSlider, setShowSlider] = useState(false);
    const [sliderState, setSliderState] = useState<QVBSC.SliderState>({ min: 0, max: 0, cur: 0, optName: "", uid: "" })
    const [loading, setLoading] = useState(false);

    //return number of credits used
    function getUsed(ds: QVBSC.VotingDecision) {
        let outcome = 0;
        ds.options.forEach(o => {
            outcome = outcome + Math.abs(intPls(o.cur));
        })
        return outcome;
    }

    //update all except one position
    function updateByExcept(ds: QVBSC.VotingDecision, uid: string, diff: number) {
        return {
            ...ds, options: ds.options.map(o => {
                if (o.uid != uid) {
                    return { ...o, max: o.max - diff };
                }
                return o;
            })
        }
    }

    function setSlider(o: QVBSC.SliderState) {
        const used = getUsed(d);
        const prevVal = Math.abs(intPls(d.options.filter(i => i.uid == o.uid)[0].cur));
        const diff = Math.abs(intPls(o.cur)) - prevVal;
        const newDS = updateByExcept(d, o.uid, diff);
        setDecision({
            ...newDS,
            creditsRemaining: (d.credits - (diff + used)),
            options: newDS.options.map(opt => {
                if (opt.uid == o.uid) {
                    return o;
                }
                return opt;
            })
        });
        setShowSlider(false);
    }

    function onClickOption(o: QVBSC.SliderState) {
        setSliderState(o);
        setShowSlider(true);
    }

    async function onSubmitVote() {
        try {
            setLoading(true);

            setLoading(false);
        } catch (e) {
            setLoading(false);
        }
    }


    return (
        <Box gap="small">
            <CreditsLeft left={d.creditsRemaining}
                max={d.credits} />
            {
                d.options.map(o => {
                    return (
                        <PosWithMeters
                            key={o.uid}
                            optName={o.optName}
                            onClick={() => onClickOption(o)}
                            credits={intPls(o.cur)}
                            maxCredits={d.credits}
                        />)
                })}
            {
                showSlider && (
                    <SliderModal
                        sliderState={sliderState}
                        setSlider={setSlider}
                        onClickOutside={(() => setShowSlider(false))}
                        globalMax={d.credits}
                    />
                )
            }
            {d.creditsRemaining == 0 && d.credits != 0 &&
                <Box align="center">
                    <Button disabled={loading} label={"Submit Vote"} onClick={onSubmitVote} />
                </Box>
            }
        </Box>
    )
}