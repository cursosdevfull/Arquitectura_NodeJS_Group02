class Medic {
  constructor(
    public name: string,
    public lastname: string,
    public cmp: string
  ) {}
}

class Driver {
  constructor(
    public name: string,
    public lastname: string,
    public license: string
  ) {}
}

class Nurse {
  constructor(
    public name: string,
    public lastname: string,
    public cmp: string
  ) {}
}

abstract class AbstractMedic {
  insert(medic: Medic): Medic {
    return medic;
  }

  delete(medic: Medic): Medic {
    return medic;
  }
}

abstract class AbstractDriver {
  insert(driver: Driver): Driver {
    return driver;
  }

  delete(driver: Driver): Driver {
    return driver;
  }
}

abstract class AbstractEntity<Entity> {
  insert(entity: Entity): Entity {
    return entity;
  }

  delete(entity: Entity): Entity {
    return entity;
  }
}

class MedicInfrastructure extends AbstractEntity<Medic> {}

const medic = new Medic("Adriana", "Zoe", "12345");
const medicInfrastructure = new MedicInfrastructure();
console.log(medicInfrastructure.insert(medic));

class DriverInfrastructure extends AbstractEntity<Driver> {}

const driver = new Driver("Alfredo", "Soto", "abcd");
const driverInfrastructure = new DriverInfrastructure();
console.log(driverInfrastructure.insert(driver));

class NurseInfrastructure extends AbstractEntity<Nurse> {}

const nurse = new Nurse("Carla", "Tamayo", "12345");
const nurseInfrastructure = new NurseInfrastructure();
console.log(nurseInfrastructure.insert(nurse));
