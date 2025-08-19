import { BaseTerminalCommand } from '../abstracts/base-terminal-command.abstract';
import { ITranslationService } from '../../core/interfaces/translation.interface';
import { TerminalComponent } from '../terminal.component';

export class AboutCommand extends BaseTerminalCommand {
  constructor(
    terminal: TerminalComponent,
    translationService: ITranslationService,
  ) {
    super(terminal, translationService);
  }

  public execute(): void {
    this.terminal.addLine(
      this.translationService.instant('ABOUT.TITLE').toString(),
    );
    this.terminal.addLine('='.repeat(30));
    this.terminal.addLine('');

    this.terminal.addLine(
      this.translationService.instant('ABOUT.DESCRIPTION').toString(),
    );
    this.terminal.addLine('');

    this.terminal.addLine(
      this.translationService.instant('ABOUT.EXPERIENCE.TITLE').toString(),
    );
    this.terminal.addLine(
      this.translationService.instant('ABOUT.EXPERIENCE.JAVASCRIPT').toString(),
    );
    this.terminal.addLine(
      this.translationService.instant('ABOUT.EXPERIENCE.PHP').toString(),
    );
    this.terminal.addLine(
      this.translationService.instant('ABOUT.EXPERIENCE.JAVA').toString(),
    );
    this.terminal.addLine(
      this.translationService.instant('ABOUT.EXPERIENCE.PYTHON').toString(),
    );
    this.terminal.addLine(
      this.translationService.instant('ABOUT.EXPERIENCE.CSHARP').toString(),
    );
    this.terminal.addLine('');

    this.terminal.addLine(
      this.translationService.instant('ABOUT.ARCHITECTURE.TITLE').toString(),
    );
    this.terminal.addLine(
      this.translationService
        .instant('ABOUT.ARCHITECTURE.DESCRIPTION')
        .toString(),
    );
    this.terminal.addLine(
      this.translationService
        .instant('ABOUT.ARCHITECTURE.MICROFRONTENDS')
        .toString(),
    );
    this.terminal.addLine(
      this.translationService
        .instant('ABOUT.ARCHITECTURE.MICROSERVICES')
        .toString(),
    );
    this.terminal.addLine(
      this.translationService.instant('ABOUT.ARCHITECTURE.DEVOPS').toString(),
    );
    this.terminal.addLine(
      this.translationService
        .instant('ABOUT.ARCHITECTURE.MONITORING')
        .toString(),
    );
    this.terminal.addLine('');

    this.terminal.addLine(
      this.translationService.instant('ABOUT.DATABASE.TITLE').toString(),
    );
    this.terminal.addLine(
      this.translationService.instant('ABOUT.DATABASE.DESCRIPTION').toString(),
    );
    this.terminal.addLine('');

    this.terminal.addLine(
      this.translationService.instant('ABOUT.METHODOLOGY.TITLE').toString(),
    );
    this.terminal.addLine(
      this.translationService
        .instant('ABOUT.METHODOLOGY.DESCRIPTION')
        .toString(),
    );
    this.terminal.addLine('');

    this.terminal.addLine(
      this.translationService
        .instant('ABOUT.CONTINUOUS_LEARNING.TITLE')
        .toString(),
    );
    this.terminal.addLine(
      this.translationService
        .instant('ABOUT.CONTINUOUS_LEARNING.DESCRIPTION')
        .toString(),
    );
  }

  public getDescription(): string {
    return this.translationService.instant('COMMANDS.ABOUT').toString();
  }
}
