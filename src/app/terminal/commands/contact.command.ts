import { BaseTerminalCommand } from '../abstracts/base-terminal-command.abstract';

export class ContactCommand extends BaseTerminalCommand {
  public execute(): void {
    this.terminal.addLine('Contato:');
    this.terminal.addLine('Email: seu.email@exemplo.com');
    this.terminal.addLine('GitHub: https://github.com/jhonatasfender');
    this.terminal.addLine('LinkedIn: https://www.linkedin.com/in/jhonatasfender/');
  }

  public getDescription(): string {
    return 'Informações de contato';
  }
}
