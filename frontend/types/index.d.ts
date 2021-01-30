export module QVBSC {
    export type Option = {
        optName: string,
        uid: string,
    }

    export type VotingOption = {
        optName: string,
        uid: string,
        credits: number
    }

    export type VotingDecision = {
        name: string,
        description: string,
        options: VotingOption[],
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