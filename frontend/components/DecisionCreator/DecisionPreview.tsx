import { QVBSC } from "../../types";
import { Text, Box } from 'grommet'

export function DecisionPreview({ d }: { d: QVBSC.Decision }) {
    return (
        <Box flex>
            <Box gap="xxsmall" >
                <Text weight="bold">{`Name:`}</Text>
                <Text>{d.name}</Text>
            </Box>
            <Box gap="xxsmall">
                <Text weight="bold">{`Details:`}</Text>
                <Text>{d.description}</Text>
            </Box>
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