import { ITerminalCommand } from '../interfaces/terminal-command.interface';
import { TerminalComponent } from '../terminal.component';
import {
  ITranslationService,
  TRANSLATION_SERVICE,
} from '../../core/interfaces/translation.interface';
import { Inject } from '@angular/core';

export abstract class BaseTerminalCommand implements ITerminalCommand {
  constructor(
    protected terminal: TerminalComponent,
    @Inject(TRANSLATION_SERVICE)
    protected translationService: ITranslationService,
  ) {}

  public abstract execute(): void;
  public abstract getDescription(): string;
}
