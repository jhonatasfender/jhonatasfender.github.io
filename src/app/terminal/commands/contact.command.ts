import { BaseTerminalCommand } from '../abstracts/base-terminal-command.abstract';
import {
  ITranslationService,
  TRANSLATION_SERVICE,
} from '../../core/interfaces/translation.interface';
import { TerminalComponent } from '../terminal.component';
import { Inject } from '@angular/core';

export class ContactCommand extends BaseTerminalCommand {
  constructor(
    terminal: TerminalComponent,
    @Inject(TRANSLATION_SERVICE) private translateService: ITranslationService,
  ) {
    super(terminal, translateService);
  }

  public execute(): void {
    this.terminal.addLine(
      this.translateService.instant('CONTACT.TITLE').toString(),
    );
    this.terminal.addLine('='.repeat(30));
    this.terminal.addLine('');

    this.terminal.addLine(
      `📧 ${this.translateService.instant('CONTACT.EMAIL').toString()}`,
    );
    this.terminal.addLine(
      `💻 ${this.translateService.instant('CONTACT.GITHUB').toString()}`,
    );
    this.terminal.addLine(
      `🔗 ${this.translateService.instant('CONTACT.LINKEDIN').toString()}`,
    );

    this.terminal.addLine('');
    this.terminal.addLine(
      '💡 Dica: Clique nos links para abrir em uma nova aba',
    );
    this.terminal.addLine('');

    const githubLink = this.translateService
      .instant('CONTACT.GITHUB')
      .toString()
      .split(': ')[1];
    const linkedinLink = this.translateService
      .instant('CONTACT.LINKEDIN')
      .toString()
      .split(': ')[1];

    this.terminal.addLine(
      `🔗 GitHub: <a href="${githubLink}" target="_blank">${githubLink}</a>`,
    );
    this.terminal.addLine(
      `🔗 LinkedIn: <a href="${linkedinLink}" target="_blank">${linkedinLink}</a>`,
    );
  }

  public getDescription(): string {
    return this.translateService.instant('COMMANDS.CONTACT').toString();
  }
}
