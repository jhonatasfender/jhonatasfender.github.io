import { BaseTerminalCommand } from '../abstracts/base-terminal-command.abstract';
import { ITerminalCommand } from '../interfaces/terminal-command.interface';
import { TerminalComponent } from '../terminal.component';

export class HelpCommand extends BaseTerminalCommand {
  private readonly availableCommands: Map<string, ITerminalCommand>;

  constructor(terminal: TerminalComponent, commands: Map<string, ITerminalCommand>) {
    super(terminal);
    this.availableCommands = commands;
  }

  public execute(): void {
    this.terminal.addLine('Comandos disponíveis:');
    this.availableCommands.forEach((command: ITerminalCommand, name: string) => {
      this.terminal.addLine(`${name.padEnd(8)} - ${command.getDescription()}`);
    });
  }

  public getDescription(): string {
    return 'Mostra esta mensagem de ajuda';
  }
}
