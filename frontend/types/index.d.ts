export module QVBSC {
    export type Option = {
        optName: string,
        uid: string,
    }

    export type Decision = {
        name: string,
        description: string,
        options: Option[],
        endTime: number
    }
}