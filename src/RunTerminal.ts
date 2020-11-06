import { blue, green, red } from "ansi-colors";
import { Terminal } from "xterm";
import XTerm from "./XTermJs";
import parseArgvString from 'string-to-argv';
import { Command } from "./commands/Command";

export const NAME = "jhonatas@fender"
export const TWO_POINTS = ":"
export const BAR = "/"
export const DOLLAR_SIGN = "$ "

export default class RunTerminal {
    private term: Terminal

    private shellprompt: string = green.bold(NAME) + TWO_POINTS + blue.bold(BAR) + DOLLAR_SIGN;

    constructor(public xterm: XTerm) {
        this.term = xterm.getTerminal() as Terminal;

        this.term.focus();

        fetch('/ascii/start.txt')
            .then((response) => {
                if (response.ok) {
                    return response.text();
                }
                console.log('Unexpected response', response);
                throw new Error('Network response was not ok.');
            })
            .then((text: string) => text?.split(/\n/g))
            .then((text: string[]) => {
                for (const draw of text) {
                    this.term.writeln(red.bold(draw.substring(0, this.term.cols)))
                }
                this.init()
            })
            .catch((e: any) => {
                console.log('err', e)
            });
    }

    public init() {
        this.xterm.write('');
        this.prompt();

        this.term.onKey((event: { key: string; domEvent: KeyboardEvent; }) => {
            const { key, domEvent } = event
            this.key(key, domEvent)
        })

        // this.term.on('paste', (data, ev: KeyboardEvent) => {
        //     this.xterm.write(data);
        // });


        // this.term.onCursorMove((arg: any) => {
        //     console.log(arg)
        // })

        this.onResize()
        window.addEventListener('resize', () => {
            this.onResize()
        })
    }

    private key(key: string, ev: KeyboardEvent) {
        const printable = (
            !ev!!.altKey && !ev!!.ctrlKey && !ev!!.metaKey
        );

        const code = key.charCodeAt(0)

        if (code >= 33 && code <= 40) {
            if (code === 39 || code === 37) {
                this.xterm.write('\x1b[<N')
            }
            return;
        } else if (code === 3) {
            this.prompt()
        } else if (code === 13) {
            const cursor = this.getCursor()
            const current = this.term.buffer.active.getLine(cursor)
            const command = current?.translateToString().replace(this.startOnNewLine(), '') as string

            console.log(cursor, this.term.buffer.active.length, this.term.buffer.active.cursorY)
            Command.init(parseArgvString(command), this.term).then(() => {
                this.prompt()
                this.term.focus()
            })
        } else if (code === 127) {
            this.validatingIfCanDeleteLine() && this.xterm.write('\b \b');
        } else if (printable) {
            this.xterm.write(key);
        }
    }

    private getCursor(): number {
        for (let i = this.term.buffer.active.length; i >= 0; i--) {
            const active = this.term.buffer.active.getLine(i)
            const translate = active?.translateToString().trim()
            console.log(i, translate)
            if (translate && translate !== "") {
                return i
            }
        }
        return 0
    }

    private onResize() {
        const geometry = this.xterm.getFitAddon().proposeDimensions()
        if (geometry) {
            // TODO: encontrar uma forma de conseguir pegar o render
            const core = (this.term as any)._core;

            const cellHeight = core._renderService.dimensions.actualCellHeight
            const height = window.innerHeight - (this.term.element?.offsetTop ? this.term.element?.offsetTop : 0) - 10

            const rows = Math.max(Math.floor(height / cellHeight), 10) + 2
            const cols = Math.max(geometry.cols, 10)

            if ((rows && this.term.rows !== rows) || (cols && this.term.cols !== cols)) {
                this.term.resize(cols, rows)
            }
        }
    }

    private prompt() {
        this.xterm.write('\r\n' + this.shellprompt);
    }

    private startOnNewLine(): string {
        return NAME + TWO_POINTS + BAR + DOLLAR_SIGN;
    }

    private validatingIfCanDeleteLine(): boolean {
        const currentLine = this.term.buffer.active.getLine(this.term.buffer.active.cursorY)
        const rx = /\s|\n|\t|\r/g

        return currentLine?.translateToString().replace(rx, '') !== this.startOnNewLine().replace(rx, '')
    }

}