import React, { MutableRefObject } from "react";

const init: {
    eth: MutableRefObject<any> | undefined,
    accounts: string[]
} = {
    eth: undefined,
    accounts: []
}

export const GlobalContext = React.createContext(init);
