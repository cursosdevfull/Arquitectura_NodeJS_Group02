import { AppointmentCommand } from './appointment-command';
import { CommandHandler } from './command-handler.interface';

export class AppointmentCommandHandler
  implements CommandHandler<AppointmentCommand>
{
  handle(command: AppointmentCommand): void {
    console.log(
      `${command.properties().namePatient} has an appointment on ${
        command.properties().date
      }`
    );
  }
  canHandle(command: any): boolean {
    return command instanceof AppointmentCommand;
  }
}
