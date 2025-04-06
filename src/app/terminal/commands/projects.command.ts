import { BaseTerminalCommand } from '../abstracts/base-terminal-command.abstract';

export class ProjectsCommand extends BaseTerminalCommand {
  public execute(): void {
    this.terminal.addLine('Projetos:');
    this.terminal.addLine('- [Nome do Projeto 1] - Descrição breve');
    this.terminal.addLine('- [Nome do Projeto 2] - Descrição breve');
    this.terminal.addLine('- [Nome do Projeto 3] - Descrição breve');
  }

  public getDescription(): string {
    return 'Meus projetos';
  }
}
