export interface CommandHandler<Command> {
  handle(command: Command): void;
  canHandle(command: any): boolean;
}
