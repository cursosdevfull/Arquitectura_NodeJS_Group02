export class PatientCommand {
  private readonly name: string;
  private readonly lastname: string;

  constructor(name: string, lastname: string) {
    this.name = name;
    this.lastname = lastname;
  }

  properties() {
    return {
      name: this.name,
      lastname: this.lastname,
    };
  }
}
