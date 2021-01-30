export module QVBSC {
    export type Option = {
        optName: string,
        uid: string,
    }

    export type SliderState = {
        max: number,
        min: number,
        cur: number | string,
        optName: string,
        uid: string,
    }

    export type VotingDecision = {
        name: string,
        creditsRemaining: number,
        description: string,
        options: SliderState[],
        endTime: number,
        credits: number
    }

    export type Decision = {
        name: string,
        description: string,
        options: Option[],
        endTime: number
    }
}