import { Injectable } from '@angular/core';
import { ITerminalError } from '../interfaces/terminal-error.interface';

@Injectable({
  providedIn: 'root'
})
export class TerminalErrorService implements ITerminalError {
  private outputElement?: HTMLElement;

  public setOutputElement(element: HTMLElement): void {
    this.outputElement = element;
  }

  public printError(message: string): void {
    if (this.outputElement) {
      this.outputElement.innerHTML += `<div class="error">${message}</div>`;
      this.outputElement.scrollTop = this.outputElement.scrollHeight;
    }
  }
}
