import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { ITerminalCommand } from './interfaces/terminal-command.interface';
import { TerminalErrorService } from './services/terminal-error.service';
import { TerminalMessageService } from './services/terminal-message.service';
import {
  HelpCommand,
  AboutCommand,
  SkillsCommand,
  ProjectsCommand,
  ContactCommand,
  ClearCommand
} from './commands';
import { CommandHistoryService } from './command-history.service';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss'],
  standalone: true
})
export class TerminalComponent implements OnInit, AfterViewInit {
  @ViewChild('commandInput') commandInput!: ElementRef;
  @ViewChild('output') output!: ElementRef;

  private outputLines: string[] = [];
  private commands: Map<string, ITerminalCommand>;

  constructor(
    private terminalErrorService: TerminalErrorService,
    private terminalMessageService: TerminalMessageService,
    private commandHistory: CommandHistoryService
  ) {
    const aboutCommand = new AboutCommand(this);
    const skillsCommand = new SkillsCommand(this);
    const projectsCommand = new ProjectsCommand(this);
    const contactCommand = new ContactCommand(this);
    const clearCommand = new ClearCommand(this);

    this.commands = new Map<string, ITerminalCommand>([
      ['about', aboutCommand],
      ['skills', skillsCommand],
      ['projects', projectsCommand],
      ['contact', contactCommand],
      ['clear', clearCommand]
    ]);

    this.commands.set('help', new HelpCommand(this, this.commands));
  }

  public ngOnInit(): void {
    this.outputLines = this.terminalMessageService.getWelcomeMessages();
  }

  public ngAfterViewInit() {
    this.outputLines.forEach(line => this.addLine(line));
    this.focusInput();
    this.terminalErrorService.setOutputElement(this.output.nativeElement);
  }

  @HostListener('document:click', ['$event'])
  public onDocumentClick(event: MouseEvent) {
    if (!this.isClickInsideTerminal(event)) {
      this.focusInput();
    }
  }

  private isClickInsideTerminal(event: MouseEvent): boolean {
    const terminalElement = this.commandInput.nativeElement.closest('.terminal');
    return terminalElement && terminalElement.contains(event.target as Node);
  }

  public focusInput(): void {
    this.commandInput.nativeElement.focus();
  }

  public handleCommand(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      const command = this.commandInput.nativeElement.value;
      if (command.trim()) {
        this.commandHistory.addCommand(command);
        this.executeCommand(command);
        this.commandInput.nativeElement.value = '';
      }
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.commandInput.nativeElement.value = this.commandHistory.getPreviousCommand();
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.commandInput.nativeElement.value = this.commandHistory.getNextCommand();
    }
  }

  private executeCommand(command: string): void {
    const outputElement = this.output.nativeElement;
    outputElement.innerHTML += `<div class="command-line">$ ${command}</div>`;
    outputElement.scrollTop = outputElement.scrollHeight;

    const commandInstance = this.commands.get(command);
    if (commandInstance) {
      commandInstance.execute();
    } else {
      this.terminalErrorService.printError(`Comando não encontrado: ${command}`);
    }

    this.focusInput();
  }

  public addLine(text: string) {
    if (this.output?.nativeElement) {
      const line = document.createElement('div');
      line.className = 'line';
      line.textContent = text;
      this.output.nativeElement.appendChild(line);
      this.output.nativeElement.scrollTop = this.output.nativeElement.scrollHeight;
    }
  }

  public clear() {
    if (this.output?.nativeElement) {
      this.output.nativeElement.innerHTML = '';
    }
  }
}
