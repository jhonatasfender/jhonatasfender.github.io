import { BaseTerminalCommand } from '../abstracts/base-terminal-command.abstract';
import { ITranslationService, TRANSLATION_SERVICE } from '../../core/interfaces/translation.interface';
import { TerminalComponent } from '../terminal.component';
import { Inject } from '@angular/core';

export class LangCommand extends BaseTerminalCommand {
  private readonly validLanguages = ['en', 'pt'];

  constructor(
    terminal: TerminalComponent,
    @Inject(TRANSLATION_SERVICE) private translateService: ITranslationService
  ) {
    super(terminal, translateService);
  }

  public execute(): void {
    const currentLang = this.translateService.getCurrentLang();
    const availableLangs = this.validLanguages;

    this.terminal.addLine(this.translateService.instant('LANGUAGE.CURRENT', { lang: currentLang }).toString());
    this.terminal.addLine('');

    this.terminal.addLine(this.translateService.instant('LANGUAGE.AVAILABLE').toString());
    this.terminal.addLine('='.repeat(30));

    availableLangs.forEach((lang: string) => {
      const langName = this.translateService.instant(`LANGUAGE.${lang.toUpperCase()}`);
      this.terminal.addLine(`- ${lang} ${langName.toString()}`);
    });

    this.terminal.addLine('');
    this.terminal.addLine(this.translateService.instant('LANGUAGE.USAGE').toString());
  }

  public getDescription(): string {
    return this.translateService.instant('COMMANDS.LANG').toString();
  }

  public changeLanguage(lang: string): void {
    const normalizedLang = lang.toLowerCase();

    if (this.validLanguages.includes(normalizedLang)) {
      const loadingElement = document.createElement('div');
      loadingElement.innerHTML = `
        <app-loading message="Loading translation..." size="small"></app-loading>
      `;
      this.terminal.addLine(loadingElement.outerHTML);

      this.translateService.use(normalizedLang).subscribe({
        next: () => {
          this.terminal.addLine(this.translateService.instant('LANGUAGE.CHANGED', { lang: normalizedLang }).toString());
        },
        error: () => {
          this.terminal.addLine(this.translateService.instant('LANGUAGE.ERROR').toString());
        }
      });
    } else {
      this.terminal.addLine(this.translateService.instant('LANGUAGE.INVALID').toString());
      this.execute();
    }
  }
}
