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
    const helpMessage: string = this.translationService.instant('COMMANDS.HELP').toString();
    this.terminal.addLine(helpMessage);

    this.availableCommands.forEach((command: ITerminalCommand, name: string) => {
      const description: string = command.getDescription();
      const paddedName: string = name.padEnd(8);
      this.terminal.addLine(`${paddedName} - ${description}`);
    });
  }

  public override getDescription(): string {
    return this.translationService.instant('COMMANDS.HELP').toString();
  }
}
