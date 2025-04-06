import { BaseTerminalCommand } from '../abstracts/base-terminal-command.abstract';
import { ITranslationService, TRANSLATION_SERVICE } from '../../core/interfaces/translation.interface';
import { TerminalComponent } from '../terminal.component';
import { Inject } from '@angular/core';

export class ProjectsCommand extends BaseTerminalCommand {
  constructor(
    terminal: TerminalComponent,
    @Inject(TRANSLATION_SERVICE) private translateService: ITranslationService
  ) {
    super(terminal, translateService);
  }

  public execute(): void {
    this.terminal.addLine(this.translateService.instant('PROJECTS.TITLE').toString());
    this.terminal.addLine('- [Nome do Projeto 1] - Descrição breve');
    this.terminal.addLine('- [Nome do Projeto 2] - Descrição breve');
    this.terminal.addLine('- [Nome do Projeto 3] - Descrição breve');
  }

  public getDescription(): string {
    return this.translateService.instant('COMMANDS.PROJECTS').toString();
  }
}
