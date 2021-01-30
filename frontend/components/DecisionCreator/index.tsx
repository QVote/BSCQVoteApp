import { QVBSC } from "../../types";
import { useState } from 'react';
import { Box, TextInput, TextArea, Button, Keyboard, Stack } from 'grommet';
import { DecisionPreview } from './DecisionPreview';
import { v4 as uuidv4 } from 'uuid';
import { DateTimeDrop } from '../DateTimeDrop'

export function DecisionCreator({ initDecision }: { initDecision: QVBSC.Decision }) {
    const [decision, setDecision] = useState(initDecision);
    const [isAddOption, setIsAddOption] = useState(false);
    const [tempOption, setTempOption] = useState("");

    const canAddOption = () => tempOption != "";

    function onChangeName(n: string) {
        setDecision({ ...decision, name: n })
    }

    function onChangeDescription(d: string) {
        setDecision({ ...decision, description: d })
    }

    function onAddNewOption() {
        if (canAddOption()) {
            const toAdd: QVBSC.Option = {
                optName: tempOption,
                uid: uuidv4()
            }
            setDecision({ ...decision, options: [...decision.options, toAdd] })
            setTempOption("");
        }

    }

    function getDateTime(milis: number) {
        const date = new Date(milis);
        let hours = date.getHours();
        const minutes = date.getMinutes();
        let pmOrAm = "";
        if (hours > 12) {
            hours = hours % 12;
            pmOrAm = "pm";
        } else {
            pmOrAm = "am";
        }
        let timeString = "";
        if (minutes < 10) {
            timeString = `${hours}:0${minutes} ${pmOrAm}`;
        } else {
            timeString = `${hours}:${minutes} ${pmOrAm}`;
        }

        return { date: date, time: timeString };
    }

    function onChangeEndTime(time: number) {
        setDecision({ ...decision, endTime: time });
    }

    return (
        <Box fill direction="row" gap="large">
            <DecisionPreview d={decision} />
            <Box flex elevation="small" round="small" pad="medium" gap="small">
                <TextInput
                    placeholder="Name"
                    value={decision.name}
                    onChange={(e) => onChangeName(e.target.value)}
                />
                <TextArea
                    placeholder="Details"
                    value={decision.description}
                    resize="vertical"
                    onChange={(e) => onChangeDescription(e.target.value)}
                />
                <DateTimeDrop
                    placeholder="End time"
                    dt={getDateTime(decision.endTime)}
                    onChange={(v) => onChangeEndTime(v)}
                />
                <Keyboard onEnter={onAddNewOption}>
                    <Box align="start">
                        {
                            isAddOption ?
                                <Box>

                                    <TextInput
                                        placeholder="Option Name"
                                        value={tempOption}
                                        onChange={(e) => setTempOption(e.target.value)}
                                    />
                                    <Box align="start">
                                        <Button disabled={!canAddOption()} label={"Confirm"} onClick={onAddNewOption} />
                                    </Box>
                                </Box>
                                :
                                <Button label={"Add option"} onClick={() => setIsAddOption(true)} />
                        }
                    </Box>
                </Keyboard>
            </Box>
        </Box>
    )
}