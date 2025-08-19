import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommandHistoryService {
  private history: string[] = [];
  private currentIndex: number = -1;
  private maxHistorySize: number = 50;

  public addCommand(command: string): void {
    if (command.trim()) {
      this.history.unshift(command);
      if (this.history.length > this.maxHistorySize) {
        this.history.pop();
      }
      this.currentIndex = -1;
    }
  }

  public getPreviousCommand(): string {
    if (this.history.length === 0) return '';

    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
    }
    return this.history[this.currentIndex];
  }

  public getNextCommand(): string {
    if (this.history.length === 0) return '';

    if (this.currentIndex > 0) {
      this.currentIndex--;
      return this.history[this.currentIndex];
    } else if (this.currentIndex === 0) {
      this.currentIndex--;
      return '';
    }
    return '';
  }

  public clearHistory(): void {
    this.history = [];
    this.currentIndex = -1;
  }
}
