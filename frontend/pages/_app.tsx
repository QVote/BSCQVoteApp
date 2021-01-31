import App from "next/app";
import Head from "next/head";
import { Grommet, grommet as grommetTheme } from "grommet";
import { deepMerge } from 'grommet/utils'
import { WithMetamask } from '../components/WithMetamask';

const customTheme = deepMerge(grommetTheme, {
    global: {
        focus: { border: { color: "accent-3" } },
        colors: {
            // Overriding existing colors
            brand: '#242424',
            "accent-1": "#24CC96",
            "accent-2": "#F9F6DC",
            "accent-3": "#C91D7B"
        },
    },
});


export default class MyApp extends App {
    componentDidMount() { }
    render() {
        //@ts-ignore
        const { Component, pageProps } = this.props;
        return (
            <>
                <Head>
                </Head>
                <Grommet theme={customTheme} full >
                    <WithMetamask>
                        <Component {...pageProps} />
                    </WithMetamask>
                </Grommet>
            </>
        );
    }
}
