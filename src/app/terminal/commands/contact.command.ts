import { BaseTerminalCommand } from '../abstracts/base-terminal-command.abstract';
import { ITranslationService, TRANSLATION_SERVICE } from '../../core/interfaces/translation.interface';
import { TerminalComponent } from '../terminal.component';
import { Inject } from '@angular/core';

export class ContactCommand extends BaseTerminalCommand {
  constructor(
    terminal: TerminalComponent,
    @Inject(TRANSLATION_SERVICE) private translateService: ITranslationService
  ) {
    super(terminal, translateService);
  }

  public execute(): void {
    this.terminal.addLine(this.translateService.instant('CONTACT.TITLE').toString());
    this.terminal.addLine(this.translateService.instant('CONTACT.EMAIL').toString());
    this.terminal.addLine(this.translateService.instant('CONTACT.GITHUB').toString());
    this.terminal.addLine(this.translateService.instant('CONTACT.LINKEDIN').toString());
  }

  public getDescription(): string {
    return this.translateService.instant('COMMANDS.CONTACT').toString();
  }
}
