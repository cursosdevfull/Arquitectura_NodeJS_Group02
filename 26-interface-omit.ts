interface PatientEssential {
  patientId: string;
  name: string;
  lastname: string;
  email: string;
}

/* interface PatientUpdate {
    name: string
    lastname: string
} */

type PatientProperties = PatientEssential;
type PatientPropertiesUpdate = Partial<
  Omit<PatientEssential, "patientId email">
>;

class Patient {
  private readonly patientId: string;
  private name: string;
  private lastname: string;
  private readonly email: string;

  constructor(properties: PatientProperties) {
    this.patientId = properties.patientId;
    this.name = properties.name;
    this.lastname = properties.lastname;
    this.email = properties.email;
  }

  update(fields: PatientPropertiesUpdate) {
    Object.assign(this, fields);
  }

  /*     update(fields: Partial<PatientUpdate>) {
        Object.assign(this, fields)
    } */
}

const properties: PatientProperties = {
  patientId: "5f622d47-fbe8-4c47-bd6a-0300ac29f1d9",
  name: "Jaime",
  lastname: "Contreras",
  email: "jaime@correo.com",
};

const patient = new Patient(properties);
console.log(patient);

patient.update({ name: "Juan Carlos" });
console.log(patient);
