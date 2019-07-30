import { ITerminalApp } from './ITerminalApp';
import { PrintScreenService } from './print-screen.service';
import * as colors from "ansi-colors";

export class PrintScreen {
    constructor(
        private term: ITerminalApp,
        public printScreenService: PrintScreenService
    ) { }

    public init() {
        let out = null;
        this.printScreenService.init().subscribe((text) => {
            out = text.replace(/\$/g, colors.red.bold('$'));
            out = text.replace(/\//g, colors.green.bold('/'))
            out = text.replace(/\\/g, colors.green.bold('\\'))
            out = text.replace(/_/g, colors.green.bold('_'))
            out = text.replace(/\|/g, colors.green.bold('|'))
        })
        return out;
    }
}
