import { BaseTerminalCommand } from '../abstracts/base-terminal-command.abstract';
import { ITranslationService } from '../../core/interfaces/translation.interface';
import { TerminalComponent } from '../terminal.component';

export class AboutCommand extends BaseTerminalCommand {
  constructor(
    terminal: TerminalComponent,
    translationService: ITranslationService
  ) {
    super(terminal, translationService);
  }

  public execute(): void {
    this.terminal.addLine(this.translationService.instant('ABOUT.TITLE').toString());
    this.terminal.addLine(this.translationService.instant('ABOUT.DESCRIPTION').toString());
    this.terminal.addLine(this.translationService.instant('ABOUT.EXPERIENCE').toString());
    this.terminal.addLine(this.translationService.instant('ABOUT.EDUCATION').toString());
    this.terminal.addLine(this.translationService.instant('ABOUT.SKILLS').toString());
  }

  public getDescription(): string {
    return this.translationService.instant('COMMANDS.ABOUT').toString();
  }
}
