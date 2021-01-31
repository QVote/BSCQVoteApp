import { QVBSC } from "../../types";
import { useState, useContext } from 'react';
import { Box, TextInput, TextArea, Button, Keyboard, Stack } from 'grommet';
import { DecisionPreview } from './DecisionPreview';
import { v4 as uuidv4 } from 'uuid';
import { DateTimeDrop } from '../DateTimeDrop'
import { decisionValidate } from './script'
import { ContractFactory, ethers } from 'ethers'
import { abi, bytecode } from '../../config';
import { GlobalContext } from '../GlobalContext'

export function DecisionCreator({ initDecision }: { initDecision: QVBSC.Decision }) {
    const [decision, setDecision] = useState(initDecision);
    const [isAddOption, setIsAddOption] = useState(false);
    const [tempOption, setTempOption] = useState("");
    const [decisionValid, setDecisionValid] = useState(decisionValidate(initDecision))
    const [loading, setLoading] = useState(false);
    const g = useContext(GlobalContext);

    const canAddOption = () => tempOption != "";

    function updateDecision(d: QVBSC.Decision) {
        setDecision(d);
        setDecisionValid(decisionValidate(d));
    }

    function onChangeName(n: string) {
        updateDecision({ ...decision, name: n })
    }

    function onChangeDescription(d: string) {
        updateDecision({ ...decision, description: d })
    }

    function onAddNewOption() {
        if (canAddOption()) {
            const toAdd: QVBSC.Option = {
                optName: tempOption,
                uid: uuidv4()
            }
            updateDecision({ ...decision, options: [...decision.options, toAdd] })
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
        updateDecision({ ...decision, endTime: time });
    }

    function onDeleteOption(o: QVBSC.Option) {
        const newOptions = decision.options.filter(x => x.uid != o.uid);
        updateDecision({ ...decision, options: newOptions })
    }

    async function onDeploy() {
        if (!loading && decisionValid) {
            try {

            } catch (e) {

            }
        }
    }

    async function deploy(company: string, election: string, options: string[], expirationMin: number) {
        // Create an instance of a Contract Factory
        const factory = new ContractFactory(abi, bytecode, signer);

        try {
            const contract = await factory.deploy(
                company,
                election,
                options.map(ethers.utils.formatBytes32String),
                expirationMin);

            let address = contract.address

            console.log(address);
            console.log(contract.deployTransaction.hash);

            contract.deployTransaction.wait()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Box fill direction="row" gap="large">
            <DecisionPreview d={decision} onDeleteOption={onDeleteOption} />
            <Box flex elevation="small" round="small" pad="medium" gap="small">
                <TextInput
                    placeholder="Name"
                    value={decision.name}
                    maxLength={100}
                    onChange={(e) => onChangeName(e.target.value)}
                />
                <TextArea
                    placeholder="Details"
                    value={decision.description}
                    resize="vertical"
                    maxLength={100}
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
                                <Box fill gap="small">
                                    <TextInput
                                        placeholder="Option Name"
                                        value={tempOption}
                                        onChange={(e) => setTempOption(e.target.value)}
                                        maxLength={100}
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
                <Box align="start">
                    <Button
                        disabled={loading || !decisionValid} label={"Deploy"} onClick={onDeploy} />
                </Box>
            </Box>
        </Box>
    )
}