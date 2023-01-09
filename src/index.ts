import { CommandBus } from './command-bus';
import { AppointmentCommand } from './commands/appointment-command';
import { AppointmentCommandHandler } from './commands/appointment-command-handler';
import { PatientCommand } from './commands/patient-command';
import { PatientCommandHandler } from './commands/patient-command-handler';

const appointmentCommand: AppointmentCommand = new AppointmentCommand(
  "John Doe",
  new Date()
);

const patientCommand = new PatientCommand("Sergio", "Hidalgo");

const commandBus = new CommandBus();
commandBus.registerHandler(new AppointmentCommandHandler());
commandBus.registerHandler(new PatientCommandHandler());

commandBus.execute(patientCommand);
commandBus.execute(appointmentCommand);
