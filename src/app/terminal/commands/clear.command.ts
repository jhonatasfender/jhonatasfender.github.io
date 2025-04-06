import { BaseTerminalCommand } from '../abstracts/base-terminal-command.abstract';

export class ClearCommand extends BaseTerminalCommand {
  public execute(): void {
    this.terminal.clear();
  }

  public getDescription(): string {
    return 'Limpa o terminal';
  }
}
