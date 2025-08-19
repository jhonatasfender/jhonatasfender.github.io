import { BaseTerminalCommand } from '../abstracts/base-terminal-command.abstract';
import {
  ITranslationService,
  TRANSLATION_SERVICE,
} from '../../core/interfaces/translation.interface';
import { TerminalComponent } from '../terminal.component';
import { Inject } from '@angular/core';

export class ExperiencesCommand extends BaseTerminalCommand {
  constructor(
    terminal: TerminalComponent,
    @Inject(TRANSLATION_SERVICE) private translateService: ITranslationService,
  ) {
    super(terminal, translateService);
  }

  public execute(): void {
    const title = this.translateService.instant('EXPERIENCES.TITLE').toString();
    this.terminal.addLine(`<span class="headline">🧳 ${title}</span>`);
    this.terminal.addLine('<div class="separator"></div>');

    const itemsValue = this.translateService
      .instant('EXPERIENCES.ITEMS')
      .getValue();
    const items: string[] = Array.isArray(itemsValue)
      ? itemsValue
      : itemsValue
        ? [itemsValue]
        : [];

    items.forEach((entry: string, idx: number) => {
      const parts = entry.split('\n');
      const header = parts.shift() || '';
      const body = parts.join('\n').trim();

      const headerHtml = `<div class="exp-header"><span class=\"tag tag-exp\">${this.translateService
        .instant('EXPERIENCES.LABEL')
        .toString()}</span> ${header}</div>`;
      const bodyHtml = body
        ? `<div class=\"exp-body\">${body.replace(/\n/g, '<br/>')}</div>`
        : '';

      this.terminal.addLine(`<div class=\"exp-item\">${headerHtml}${bodyHtml}</div>`);

      if (idx < items.length - 1) {
        this.terminal.addLine('<div class="exp-divider"></div>');
      }
    });
  }

  public getDescription(): string {
    return this.translateService.instant('COMMANDS.EXPERIENCES').toString();
  }
}
