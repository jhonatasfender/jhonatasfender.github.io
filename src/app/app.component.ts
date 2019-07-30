import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { Terminal } from 'xterm';
import * as fit from 'xterm/lib/addons/fit/fit';
import { ITerminalApp } from './ITerminalApp';
import * as colors from "ansi-colors";
import { PrintScreenService } from "./print-screen.service";
import { PrintScreen } from './print-screen';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('terminal', { static: true }) terminal: ElementRef;

  public title = 'terminal-web';

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
      rows: parseInt((window.screen.height / 19).toString())
    });

    let printInit = new PrintScreen(this.term, this.printScreenService)
    console.log(printInit.init());

    this.term.prompt = () => {
      this.term.write('\r\n' + this.shellprompt);
    };


    this.term.focus();

    // this.term.setTheme({
    //   background: '#333',
    //   red: '#F00',
    //   brightRed: '#F22',
    //   // ... (can be a partial list)
    // });

    this.term.open(this.terminal.nativeElement);

    this.term.prompt();
    this.term.on('key', (key, ev: KeyboardEvent) => {
      // @ts-ignore
      let printable = !ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.metaKey;

      if (ev.keyCode == 13) {
        this.term.prompt();
      } else if (ev.keyCode == 8) {
        this.term.write('\b \b');
      } else if (printable) {
        this.term.write(key);
      }
      this.term.fit();
    });

    this.term.on('paste', function (data, ev) {
      this.term.write(data);
    });
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