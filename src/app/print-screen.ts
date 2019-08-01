import { ITerminalApp } from './ITerminalApp';
import { PrintScreenService } from './print-screen.service';
import * as colors from "ansi-colors";
import { Observable } from 'rxjs';

export class PrintScreen {
    constructor(
        private term: ITerminalApp,
        public printScreenService: PrintScreenService
    ) { }

    public init() {
        return this.printScreenService.init().subscribe((text) => {
            this.term.write(colors.blue.bold(text));
        })
    }
}
