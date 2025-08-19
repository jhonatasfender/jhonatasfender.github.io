import { InjectionToken } from '@angular/core';

export interface ITerminalError {
  setOutputElement(element: HTMLElement): void;
  printError(message: string): void;
}

export const TERMINAL_ERROR = new InjectionToken<ITerminalError>(
  'TERMINAL_ERROR',
);
