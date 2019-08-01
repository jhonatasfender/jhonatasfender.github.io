import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { Terminal } from 'xterm';
import * as fit from 'xterm/lib/addons/fit/fit';
import { ITerminalApp } from './ITerminalApp';
import * as colors from "ansi-colors";
import { PrintScreenService } from "./print-screen.service";
import { PrintScreen } from './print-screen';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  @ViewChild('terminal', { static: true }) terminal: ElementRef;

  public title: string = 'terminal-web';
  public input: string = "";
  public cursor: number = 0;

  public term: ITerminalApp;
  public container: HTMLElement;

  private shellprompt: string = colors.green.bold('jhonatas@fender') + ':' + colors.blue.bold('/') + '$ ';

  constructor(public printScreenService: PrintScreenService) {
    Terminal.applyAddon(fit);
  }

  ngOnInit() {
    // @ts-ignore
    this.term = new Terminal({
      cursorBlink: true,
      convertEol: true,
      fontFamily: `'Fira Mono', monospace`,
      fontSize: 15,
      rendererType: 'dom', // default is canvas
      rows: parseInt((window.screen.height / 21.4).toString())
    });
    console.log(window.screen.height);

    let printInit = new PrintScreen(this.term, this.printScreenService)
    printInit.init().add(() => {

      this.term.prompt = () => {
        this.term.write('\r\n' + this.shellprompt);
      };

      this.term.focus();

      this.term.open(this.terminal.nativeElement);

      this.term.prompt();

      this.term.on('key', (key, ev: KeyboardEvent) => {
        // @ts-ignore
        let printable = !ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.metaKey;

        this.controllingKeyboardArrows(ev)

        if (ev.keyCode == 13) {
          this.term.write(colors.red("\r\nYou typed: '" + this.input + "'\r\n"));
          this.term.prompt();
          this.input = "";
        } else if (ev.keyCode == 8) {
          this.validatingIfCanDeleteLine() && this.term.write('\b \b');
        } else if (printable) {
          this.term.write(key);
          this.input += key;
        }
        this.term.fit();
      });

      this.term.on('paste', function (data, ev) {
        this.term.write(data);
      });

      window.addEventListener("load", () => {
        this.term.fit();
      });
    });
  }

  public controllingKeyboardArrows(ev) {
    if (ev.keyCode >= 32 && ev.keyCode <= 40) {
      if (ev.keyCode === 39 || ev.keyCode === 37) {
        // this.term.write('\x1b[<N')
      }
      return;
    }
  }

  private validatingIfCanDeleteLine(): boolean {
    let textIsNotDelete = this.term.buffer.getLine(this.term.buffer.cursorY).translateToString();
    return textIsNotDelete.replace(/\s|\n|\t|\r/g, '') !== 'jhonatas@fender:/$'
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.term.fit();
    this.bug();
  }


  private bug() {
    console.log(
      this.term.cols,
      this.term.rows
    );
  }
}