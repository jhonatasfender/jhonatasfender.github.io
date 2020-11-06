import { Terminal } from "xterm";
import { CommandImplements } from "./CommandImplements";

export class Clear extends CommandImplements {
    private static term: Terminal
    private static command: string[]

    private constructor() { super() }

    public static execute<T>(term: Terminal, command: string[]): Promise<T> {
        this.term = term
        this.command = command

        return new Promise((resolve: () => void, reject: () => void) => {
            for (let i = 0; i < this.term.rows; i++) {
                this.term.clear()
            }
            resolve()
        })

        /**
         * TODO: resolver o bug do porque está ficando uma linha
         * escrito clear, sendo que ela deveria se apagada tambám
         * tentei executar novamente o clear do xterm mais não foi com sucesso
         */
    }
}