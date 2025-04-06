import { ITerminalCommand } from '../interfaces/terminal-command.interface';
import { TerminalComponent } from '../terminal.component';

export abstract class BaseTerminalCommand implements ITerminalCommand {
  constructor(protected terminal: TerminalComponent) {}
  abstract execute(): void;
  abstract getDescription(): string;
}
