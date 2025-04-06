import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, HostListener, Inject } from '@angular/core';
import { TerminalMessageService } from './services/terminal-message.service';
import { CommandHistoryService } from './command-history.service';
import { ITranslationService, TRANSLATION_SERVICE } from '../core/interfaces/translation.interface';
import { ITerminalCommand } from './interfaces/terminal-command.interface';
import { ITerminalError, TERMINAL_ERROR } from './interfaces/terminal-error.interface';
import { AboutCommand } from './commands/about.command';
import { SkillsCommand } from './commands/skills.command';
import { ProjectsCommand } from './commands/projects.command';
import { ContactCommand } from './commands/contact.command';
import { ClearCommand } from './commands/clear.command';
import { LangCommand } from './commands/lang.command';
import { HelpCommand } from './commands/help.command';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class TerminalComponent implements OnInit, AfterViewInit {
  @ViewChild('commandInput') private commandInput!: ElementRef<HTMLInputElement>;
  @ViewChild('output') private output!: ElementRef<HTMLDivElement>;
  @ViewChild('terminal') private terminal!: ElementRef<HTMLDivElement>;

  private outputLines: string[] = [];
  private commands: Map<string, ITerminalCommand>;
  private pendingMessages: string[] = [];
  public isMobile: boolean = window.innerWidth <= 1024;

  constructor(
    @Inject(TERMINAL_ERROR) private terminalErrorService: ITerminalError,
    private terminalMessageService: TerminalMessageService,
    private commandHistory: CommandHistoryService,
    @Inject(TRANSLATION_SERVICE) private translationService: ITranslationService
  ) {
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth <= 1024;
    });

    const aboutCommand = new AboutCommand(this, translationService);
    const skillsCommand = new SkillsCommand(this, translationService);
    const projectsCommand = new ProjectsCommand(this, translationService);
    const contactCommand = new ContactCommand(this, translationService);
    const clearCommand = new ClearCommand(this, translationService);
    const langCommand = new LangCommand(this, translationService);

    this.commands = new Map<string, ITerminalCommand>([
      ['about', aboutCommand],
      ['skills', skillsCommand],
      ['projects', projectsCommand],
      ['contact', contactCommand],
      ['clear', clearCommand],
      ['lang', langCommand]
    ]);

    this.commands.set('help', new HelpCommand(this, this.commands, translationService));
  }

  public ngOnInit(): void {
    this.terminalMessageService.getWelcomeMessages().subscribe({
      next: (messages) => {
        this.pendingMessages = messages;
        if (this.output) {
          this.displayPendingMessages();
        }
      },
      error: (error) => {
        console.error('Error getting welcome messages:', error);
      }
    });
  }

  public ngAfterViewInit(): void {
    if (this.pendingMessages.length > 0) {
      this.displayPendingMessages();
    }
    this.focusInput();
    this.terminalErrorService.setOutputElement(this.output.nativeElement);
  }

  private displayPendingMessages(): void {
    this.pendingMessages.forEach(message => {
      if (message) {
        this.addLine(message);
      }
    });
    this.pendingMessages = [];
  }

  @HostListener('document:click', ['$event'])
  public onDocumentClick(event: MouseEvent): void {
    if (!this.isClickInsideTerminal(event)) {
      this.focusInput();
    }
  }

  private isClickInsideTerminal(event: MouseEvent): boolean {
    const terminalElement = this.commandInput.nativeElement.closest('.terminal');
    return terminalElement?.contains(event.target as Node) ?? false;
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

  public executeCommand(command: string): void {
    const outputElement = this.output.nativeElement;
    outputElement.innerHTML += `<div class="command-line">$ ${command}</div>`;
    outputElement.scrollTop = outputElement.scrollHeight;

    const [commandName, ...args] = command.split(' ');
    const commandInstance = this.commands.get(commandName);

    if (commandInstance) {
      if (commandName === 'lang' && args.length > 0) {
        (commandInstance as LangCommand).changeLanguage(args[0]);
      } else {
        commandInstance.execute();
      }
    } else {
      const errorTranslation = this.translationService.instant('ERRORS.COMMAND_NOT_FOUND', { command });
      const errorMessage = errorTranslation.toString();
      this.terminalErrorService.printError(errorMessage);
    }

    this.focusInput();
  }

  public addLine(line: string): void {
    const outputElement = this.output.nativeElement;
    outputElement.innerHTML += `<div class="line">${line}</div>`;
    outputElement.scrollTop = outputElement.scrollHeight;
  }

  public clear(): void {
    this.output.nativeElement.innerHTML = '';
  }
}
