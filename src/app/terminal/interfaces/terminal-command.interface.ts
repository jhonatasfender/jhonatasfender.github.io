export interface ITerminalCommand {
  execute(): void;
  getDescription(): string;
}
