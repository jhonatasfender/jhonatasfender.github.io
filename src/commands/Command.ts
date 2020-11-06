import { Terminal } from "xterm"
import { Clear } from "./Clear"
import { Positions } from "./Positions"

export interface ListCommands {
    readonly name: string
    readonly execute: any
}

const listCommands: ListCommands[] = [
    {
        name: 'clear',
        execute: Clear.execute
    },
    {
        name: 'positions',
        execute: Positions.execute
    }
]

export class Command {

    private constructor() { }

    public static init(
        command: string[],
        term: Terminal
    ) {
        return new Promise((resolve: () => void, reject: () => void) => {
            const exec = listCommands.find((v: ListCommands) => v.name === command[0]) as ListCommands
            console.log(exec, command)
            if (exec)
                return exec.execute(term, command).then(() => resolve())
            return resolve()
        })
    }
}