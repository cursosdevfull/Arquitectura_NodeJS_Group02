import { CommandHandler } from './commands/command-handler.interface';

export class CommandBus {
  private readonly handlers: CommandHandler<any>[] = [];

  registerHandler(handler: CommandHandler<any>): void {
    this.handlers.push(handler);
  }

  execute(command: any) {
    const handler = this.handlers.find((h) => h.canHandle(command));
    if (handler) {
      handler.handle(command);
    }
  }
}
