import { Text, Button, Box } from 'grommet'
import { useRouter } from 'next/router'

export default function Index() {
    return (
        <Box gap="small">
            <Text>{"This is the actual app"}</Text>
            <Box direction="row" gap="small">
                <RouteButton label={"Create"} route={"/create"} />
                <RouteButton label={"Mint Votes"} route={"/mint"} />
                <RouteButton label={"Vote"} route={"/vote"} />
                <RouteButton label={"View Results"} route={"/results"} />
            </Box>
        </Box>
    )
}

function RouteButton({ label, route }:
    { label: string, route: string }) {
    const router = useRouter();

    function onRoute() {
        router.push(route);
    }

    return (
        <Box align="center">
            <Button label={label} onClick={onRoute} />
        </Box>
    )
}