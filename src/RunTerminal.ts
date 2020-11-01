import { blue, green, red } from "ansi-colors";
import { Terminal } from "./Terminal";
import XTerm from "./XTermJs";

export default class RunTerminal {
    private term: Terminal

    private shellprompt: string = green.bold('jhonatas@fender') + ':' + blue.bold('/') + '$ ';

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
                    this.xterm.writeln(red.bold(draw))
                }
                this.init()
            })
            .catch((e: any) => {
                console.log('err', e)
            });
    }

    public init() {
        this.xterm.writeln('');
        this.prompt();

        // this.term.on('key', (key: any, ev: KeyboardEvent) => {
        //     const printable = (
        //         !ev!!.altKey && !ev!!.ctrlKey && !ev!!.metaKey
        //     );

        //     if (ev.keyCode >= 33 && ev.keyCode <= 40) {
        //         if (ev.keyCode === 39 || ev.keyCode === 37) {
        //             this.term.write('\x1b[<N')
        //         }
        //         return;
        //     } else if (ev!!.keyCode === 13) {
        //         this.prompt();
        //     } else if (ev!!.keyCode === 8) {
        //         this.validatingIfCanDeleteLine() && this.term.write('\b \b');
        //     } else if (printable) {
        //         this.xterm.write(key);
        //     }
        // });

        // this.term.on('paste', (data, ev: KeyboardEvent) => {
        //     this.xterm.write(data);
        // });

        // this.onResize()
        // window.addEventListener('resize', () => {
        //     this.onResize()
        // })
    }

    private onResize() {
        const geometry = this.term.proposeGeometry()
        if (geometry) {
            const cellHeight = this.term.renderer.dimensions.actualCellHeight
            const height = window.innerHeight - this.term.element.offsetTop - 10

            const rows = Math.max(Math.floor(height / cellHeight), 10)
            const cols = Math.max(geometry.cols, 10)

            if (this.term.rows !== rows || this.term.cols !== cols) {
                this.term.resize(cols, rows)
            }
        }
    }

    private prompt() {
        this.xterm.write('\r\n' + this.shellprompt);
    }

    private validatingIfCanDeleteLine(): boolean {
        const textIsNotDelete = this.term.buffers?.active.lines.get(this.term.buffer.y)// .map((v:any[]) => v[1]).join('')
        console.log(textIsNotDelete)

        // return textIsNotDelete.replace(/\s|\n|\t|\r/g, '') !== 'jhonatas@fender:/$'
        return true
    }

}