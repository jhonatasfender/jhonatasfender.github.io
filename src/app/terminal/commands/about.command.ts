import { BaseTerminalCommand } from '../abstracts/base-terminal-command.abstract';

export class AboutCommand extends BaseTerminalCommand {
  public execute(): void {
    this.terminal.addLine('Sobre mim:');
    this.terminal.addLine('Desenvolvedor Fullstack com experiência em diversas tecnologias.');
    this.terminal.addLine('Apaixonado por tecnologia e sempre buscando aprender mais.');
    this.terminal.addLine('GitHub: https://github.com/jhonatasfender');
    this.terminal.addLine('LinkedIn: https://www.linkedin.com/in/jhonatasfender/');
  }

  public getDescription(): string {
    return 'Informações sobre mim';
  }
}
