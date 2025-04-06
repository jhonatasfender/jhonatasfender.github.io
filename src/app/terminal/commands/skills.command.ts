import { BaseTerminalCommand } from '../abstracts/base-terminal-command.abstract';
import { ITranslationService, TRANSLATION_SERVICE } from '../../core/interfaces/translation.interface';
import { TerminalComponent } from '../terminal.component';
import { Inject } from '@angular/core';

export class SkillsCommand extends BaseTerminalCommand {
  constructor(
    terminal: TerminalComponent,
    @Inject(TRANSLATION_SERVICE) private translateService: ITranslationService
  ) {
    super(terminal, translateService);
  }

  public execute(): void {
    this.terminal.addLine(this.translateService.instant('SKILLS.TITLE').toString());
    this.terminal.addLine(this.translateService.instant('SKILLS.FRONTEND').toString());
    this.terminal.addLine(this.translateService.instant('SKILLS.BACKEND').toString());
    this.terminal.addLine(this.translateService.instant('SKILLS.DATABASE').toString());
    this.terminal.addLine(this.translateService.instant('SKILLS.DEVOPS').toString());
    this.terminal.addLine(this.translateService.instant('SKILLS.OTHERS').toString());
  }

  public getDescription(): string {
    return this.translateService.instant('COMMANDS.SKILLS').toString();
  }
}
