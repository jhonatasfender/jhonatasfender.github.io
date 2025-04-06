import { BaseTerminalCommand } from '../abstracts/base-terminal-command.abstract';
import { ITranslationService, TRANSLATION_SERVICE } from '../../core/interfaces/translation.interface';
import { TerminalComponent } from '../terminal.component';
import { Inject } from '@angular/core';

export class LangCommand extends BaseTerminalCommand {
  constructor(
    terminal: TerminalComponent,
    @Inject(TRANSLATION_SERVICE) private translateService: ITranslationService
  ) {
    super(terminal, translateService);
  }

  public execute(): void {
    const currentLang = this.translateService.getCurrentLang();
    const availableLangs = this.translateService.getAvailableLangs();

    this.terminal.addLine(this.translateService.instant('LANGUAGE.CURRENT', { lang: currentLang }).toString());
    this.terminal.addLine(this.translateService.instant('LANGUAGE.AVAILABLE').toString());

    availableLangs.forEach((lang: string) => {
      const langName = this.translateService.instant(`LANGUAGE.${lang.toUpperCase()}`);
      this.terminal.addLine(`- ${lang} (${langName.toString()})`);
    });
  }

  public getDescription(): string {
    return this.translateService.instant('COMMANDS.LANG').toString();
  }

  public changeLanguage(lang: string): void {
    if (this.translateService.getAvailableLangs().includes(lang)) {
      this.translateService.use(lang);
      this.terminal.addLine(this.translateService.instant('LANGUAGE.CHANGED', { lang }).toString());
    } else {
      this.terminal.addLine(this.translateService.instant('ERRORS.COMMAND_NOT_FOUND', { command: lang }).toString());
    }
  }
}
