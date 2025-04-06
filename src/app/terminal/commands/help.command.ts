import { BaseTerminalCommand } from '../abstracts/base-terminal-command.abstract';
import { ITerminalCommand } from '../interfaces/terminal-command.interface';
import { TerminalComponent } from '../terminal.component';
import { ITranslationService, TRANSLATION_SERVICE } from '../../core/interfaces/translation.interface';
import { Inject } from '@angular/core';

export class HelpCommand extends BaseTerminalCommand {
  private readonly availableCommands: Map<string, ITerminalCommand>;

  constructor(
    terminal: TerminalComponent,
    commands: Map<string, ITerminalCommand>,
    @Inject(TRANSLATION_SERVICE) translationService: ITranslationService
  ) {
    super(terminal, translationService);
    this.availableCommands = commands;
  }

  public override execute(): void {
    const header = this.translationService.instant('TIPS.HELP_HEADER').toString();
    this.terminal.addLine(header);
    this.terminal.addLine('='.repeat(header.length));

    this.availableCommands.forEach((command: ITerminalCommand, name: string) => {
      const description: string = command.getDescription();
      const paddedName: string = name.padEnd(12);
      this.terminal.addLine(`${paddedName} ${description}`);
    });

    this.terminal.addLine('');
    const footer = this.translationService.instant('TIPS.HELP_FOOTER').toString();
    this.terminal.addLine(footer);
  }

  public override getDescription(): string {
    return this.translationService.instant('COMMANDS.HELP').toString();
  }
}
