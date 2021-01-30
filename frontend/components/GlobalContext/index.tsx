import { GlobalContext } from "./GlobalContext";
import { MutableRefObject } from 'react';

const Context = ({ children, eth, accounts }:
    { children: React.ReactNode, eth: MutableRefObject<any>, accounts: string[] }) => {
    return (
        <GlobalContext.Provider value={{
            eth,
            accounts
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export { GlobalContext, Context };
