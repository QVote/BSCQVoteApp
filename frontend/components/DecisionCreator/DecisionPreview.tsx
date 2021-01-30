import { QVBSC } from "../../types";
import { Text, Box, Button } from 'grommet'
import { Trash } from 'grommet-icons'

function formatMilisecondsToDateString(milis: number) {
    return new Date(milis).toLocaleString();
}

function Disp({ t, toDisp }: { t: string, toDisp: string }) {
    return (
        <Box gap="xxsmall">
            <Text weight="bold">{t}</Text>
            <Text wordBreak="break-all">{toDisp}</Text>
        </Box>
    )
}

export function DecisionPreview({ d, onDeleteOption }:
    { d: QVBSC.Decision, onDeleteOption: (o: QVBSC.Option) => void }) {
    return (
        <Box flex elevation="small" round="small" pad="medium" gap="small">
            <Disp t={"Name:"} toDisp={d.name} />
            <Disp t={"Details:"} toDisp={d.description} />
            <Disp t={"EndTime:"} toDisp={formatMilisecondsToDateString(d.endTime)} />
            <Box overflow={{ vertical: "auto" }} height={{ max: "medium" }}>
                {
                    d.options.length != 0 &&
                    <Text weight="bold">{`Options:`}</Text>
                }
                {
                    d.options.map((o) => {
                        return (
                            <Box
                                key={o.uid}
                                direction="row"
                                align="center"
                                justify="between"
                                height={{ min: "xsmall" }}
                            >
                                <Text wordBreak="break-all">
                                    {o.optName}
                                </Text>
                                <Button icon={<Trash />} onClick={() => onDeleteOption(o)} />
                            </Box>
                        )
                    })
                }
            </Box>
        </Box>
    )
}