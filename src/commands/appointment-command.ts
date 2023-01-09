export class AppointmentCommand {
  private readonly namePatient: string;
  private readonly date: Date;

  constructor(namePatient: string, date: Date) {
    this.namePatient = namePatient;
    this.date = date;
  }

  properties() {
    return {
      namePatient: this.namePatient,
      date: this.date,
    };
  }
}
