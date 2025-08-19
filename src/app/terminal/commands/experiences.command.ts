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

    items.forEach((entry: string) => {
      this.terminal.addLine(
        `<span class="tag tag-exp">${this.translateService.instant('EXPERIENCES.LABEL').toString()}</span> ${entry}`,
      );
    });
  }

  public getDescription(): string {
    return this.translateService.instant('COMMANDS.EXPERIENCES').toString();
  }
}
