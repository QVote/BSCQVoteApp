import { Box, Text } from 'grommet';
import { MutableRefObject } from 'react';
import _config from '../../config';
import { Context } from '../GlobalContext'

export const ConnectedInterface = ({ accounts, eth, children }:
    {
        accounts: string[],
        eth: MutableRefObject<any>,
        children: React.ReactNode
    }) => {

    return (
        <Box fill gap="small" align="center">
            <Text>{accounts}</Text>
            <Context accounts={accounts} eth={eth}>
                {children}
            </Context>
        </Box>
    )
}