import { Terminal } from "xterm";

export class CommandImplements {
    protected constructor() { }

    public static execute(term: Terminal, command: string[]): Promise<void> {
        throw new Error("not implemented!");
    }
}
