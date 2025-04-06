import { Injectable } from '@angular/core';
import { ITerminalError } from '../interfaces/terminal-error.interface';

@Injectable({
  providedIn: 'root'
})
export class TerminalErrorService implements ITerminalError {
  private outputElement: HTMLElement | null = null;

  public setOutputElement(element: HTMLElement): void {
    this.outputElement = element;
  }

  public printError(message: string): void {
    if (!this.outputElement) {
      console.error('Output element not set');
      return;
    }

    const errorLine = document.createElement('div');
    errorLine.className = 'line error';
    errorLine.textContent = `Erro: ${message}`;
    this.outputElement.appendChild(errorLine);
    this.outputElement.scrollTop = this.outputElement.scrollHeight;
  }
}
