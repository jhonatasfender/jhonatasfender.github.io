import { Injectable } from '@angular/core';
import { ITerminalMessage } from '../interfaces/terminal-message.interface';

@Injectable({
  providedIn: 'root'
})
export class TerminalMessageService implements ITerminalMessage {
  public getWelcomeMessages(): string[] {
    return [
      'Bem-vindo ao meu portfólio!',
      'Digite "help" para ver os comandos disponíveis.'
    ];
  }
}
