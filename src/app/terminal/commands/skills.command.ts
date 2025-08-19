import { BaseTerminalCommand } from '../abstracts/base-terminal-command.abstract';
import {
  ITranslationService,
  TRANSLATION_SERVICE,
} from '../../core/interfaces/translation.interface';
import { TerminalComponent } from '../terminal.component';
import { Inject } from '@angular/core';

export class SkillsCommand extends BaseTerminalCommand {
  constructor(
    terminal: TerminalComponent,
    @Inject(TRANSLATION_SERVICE) private translateService: ITranslationService,
  ) {
    super(terminal, translateService);
  }

  public execute(): void {
    const title = this.translateService.instant('SKILLS.TITLE').toString();
    this.terminal.addLine(`<span class="headline">⚡ ${title}</span>`);
    this.terminal.addLine('<div class="separator"></div>');

    this.printCategory(
      'tag-frontend',
      `🎨 ${this.translateService.instant('SKILLS.LABELS.FRONTEND').toString()}`,
      this.translateService.instant('SKILLS.FRONTEND').toString(),
    );
    this.printCategory(
      'tag-backend',
      `🛠️ ${this.translateService.instant('SKILLS.LABELS.BACKEND').toString()}`,
      this.translateService.instant('SKILLS.BACKEND').toString(),
    );
    this.printCategory(
      'tag-mobile',
      `📱 ${this.translateService.instant('SKILLS.LABELS.MOBILE').toString()}`,
      this.translateService.instant('SKILLS.MOBILE').toString(),
    );
    this.printCategory(
      'tag-db',
      `🗄️ ${this.translateService.instant('SKILLS.LABELS.DATABASE').toString()}`,
      this.translateService.instant('SKILLS.DATABASE').toString(),
    );
    this.printCategory(
      'tag-devops',
      `⚙️ ${this.translateService.instant('SKILLS.LABELS.DEVOPS').toString()}`,
      this.translateService.instant('SKILLS.DEVOPS').toString(),
    );
    this.printCategory(
      'tag-monitoring',
      `📊 ${this.translateService.instant('SKILLS.LABELS.MONITORING').toString()}`,
      this.translateService.instant('SKILLS.MONITORING').toString(),
    );
    this.printCategory(
      'tag-arch',
      `🏗️ ${this.translateService.instant('SKILLS.LABELS.ARCHITECTURE').toString()}`,
      this.translateService.instant('SKILLS.ARCHITECTURE').toString(),
    );
    this.printCategory(
      'tag-others',
      `🧰 ${this.translateService.instant('SKILLS.LABELS.OTHERS').toString()}`,
      this.translateService.instant('SKILLS.OTHERS').toString(),
    );
  }

  private printCategory(tagClass: string, label: string, items: string): void {
    this.terminal.addLine(
      `<span class="tag ${tagClass}">${label}</span> ${items}`,
    );
  }

  public getDescription(): string {
    return this.translateService.instant('COMMANDS.SKILLS').toString();
  }
}
