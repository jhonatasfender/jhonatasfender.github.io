import { BaseTerminalCommand } from '../abstracts/base-terminal-command.abstract';
import { ITranslationService, TRANSLATION_SERVICE } from '../../core/interfaces/translation.interface';
import { TerminalComponent } from '../terminal.component';
import { Inject } from '@angular/core';

export class ClearCommand extends BaseTerminalCommand {
  constructor(
    terminal: TerminalComponent,
    @Inject(TRANSLATION_SERVICE) private translateService: ITranslationService
  ) {
    super(terminal, translateService);
  }

  public execute(): void {
    this.terminal.clear();
  }

  public getDescription(): string {
    return this.translateService.instant('COMMANDS.CLEAR').toString();
  }
}
