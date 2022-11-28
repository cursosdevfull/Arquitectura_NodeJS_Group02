class MedicBuilder {
  name: string;
  lastname: string;
  cmp: string;
  email: string;
  specialty: string;
  subSpecialty: string;

  addName(name: string): MedicBuilder {
    this.name = name;
    return this;
  }

  addLastname(lastname: string): MedicBuilder {
    this.lastname = lastname;
    return this;
  }

  addCMP(cmp: string): MedicBuilder {
    this.cmp = cmp;
    return this;
  }

  addEmail(email: string): MedicBuilder {
    this.email = email;
    return this;
  }

  addSpecialty(specialty: string): MedicBuilder {
    this.specialty = specialty;
    return this;
  }

  addSubSpecialty(subSpecialty: string): MedicBuilder {
    this.subSpecialty = subSpecialty;
    return this;
  }

  create(): Medic {
    return new Medic(this);
  }
}

class Medic {
  name: string;
  lastname: string;
  cmp: string;
  email: string;
  specialty: string;
  subSpecialty: string;

  constructor(properties: MedicBuilder) {
    Object.assign(this, properties);
  }
}

const builder = new MedicBuilder();
const medic = builder
  .addName("Sergio")
  .addLastname("Hidalgo")
  .addCMP("12345")
  .addEmail("correo@correo.com")
  .addSpecialty("Cardiología")
  .addSubSpecialty("Cardiología geriátrica")
  .create();

console.log(medic);
