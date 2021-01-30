import App from "next/app";
import Head from "next/head";
import { Grommet, grommet as grommetTheme } from "grommet";
import { WithMetamask } from '../components/WithMetamask';

export default class MyApp extends App {
    componentDidMount() { }
    render() {
        //@ts-ignore
        const { Component, pageProps } = this.props;
        return (
            <>
                <Head>
                </Head>
                <Grommet theme={grommetTheme} full>
                    <WithMetamask>
                        <Component {...pageProps} />
                    </WithMetamask>
                </Grommet>
            </>
        );
    }
}
