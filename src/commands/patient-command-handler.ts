import { CommandHandler } from './command-handler.interface';
import { PatientCommand } from './patient-command';

export class PatientCommandHandler implements CommandHandler<PatientCommand> {
  handle(command: PatientCommand): void {
    console.log(
      `Patient ${command.properties().name} ${command.properties().lastname}`
    );
  }
  canHandle(command: any): boolean {
    return command instanceof PatientCommand;
  }
}
