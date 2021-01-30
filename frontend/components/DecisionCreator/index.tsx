import { QVBSC } from "../../types";
import { useState } from 'react';
import { Box, TextInput, TextArea, Button, Keyboard, Stack } from 'grommet';
import { DecisionPreview } from './DecisionPreview';
import { v4 as uuidv4 } from 'uuid';

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

    return (
        <Box fill direction="row">
            <DecisionPreview d={decision} />
            <Box flex>
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