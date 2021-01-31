import React, { MutableRefObject } from "react";

const init: {
    eth: MutableRefObject<any> | undefined,
    accounts: string[],
    qvoteAddress: string,
    isAddress: boolean,
    isQVContract: boolean,
} = {
    eth: undefined,
    accounts: [],
    qvoteAddress: "",
    isAddress: false,
    isQVContract: false,
}

export const GlobalContext = React.createContext(init);
