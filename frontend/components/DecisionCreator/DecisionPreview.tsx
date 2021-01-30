import { QVBSC } from "../../types";
import { Text, Box } from 'grommet'

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

export function DecisionPreview({ d }: { d: QVBSC.Decision }) {
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
                            <Text key={o.uid}>
                                {o.optName}
                            </Text>
                        )
                    })
                }
            </Box>
        </Box>
    )
}