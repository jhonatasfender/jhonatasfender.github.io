import { BaseTerminalCommand } from '../abstracts/base-terminal-command.abstract';

export class SkillsCommand extends BaseTerminalCommand {
  public execute(): void {
    this.terminal.addLine('Habilidades Técnicas:');
    this.terminal.addLine('- Desenvolvimento Frontend: Angular, React, Vue.js');
    this.terminal.addLine('- Desenvolvimento Backend: Node.js, Python, Java');
    this.terminal.addLine('- Banco de Dados: MySQL, PostgreSQL, MongoDB');
    this.terminal.addLine('- DevOps: Docker, CI/CD, AWS');
    this.terminal.addLine('- Outros: Git, Linux, Scrum');
  }

  public getDescription(): string {
    return 'Minhas habilidades técnicas';
  }
}
