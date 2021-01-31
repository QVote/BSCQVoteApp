import { QVBSC } from '../../types';
import { DecisionPreview } from '../DecisionCreator/DecisionPreview'
import { Box, Text } from 'grommet'

export function VotesMinter({ d }: { d: QVBSC.Decision }) {

    return (
        <Box>
            <DecisionPreview d={d} />
        </Box>

    )
}