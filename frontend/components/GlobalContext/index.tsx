import { GlobalContext } from "./GlobalContext";
import { MutableRefObject } from 'react';

const Context = ({ children, eth, accounts, qvoteAddress, isAddress, isQVContract }:
    {
        children: React.ReactNode,
        eth: MutableRefObject<any>,
        accounts: string[],
        qvoteAddress: string,
        isAddress: boolean,
        isQVContract: boolean,
    }) => {
    return (
        <GlobalContext.Provider value={{
            eth,
            accounts,
            qvoteAddress,
            isAddress,
            isQVContract
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export { GlobalContext, Context };
