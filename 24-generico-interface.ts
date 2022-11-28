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

interface BaseRepository<Entity> {
  insert(entity: Entity): Entity;
  delete(entity: Entity): Entity;
}

interface MedicRepository extends BaseRepository<Medic> {
  find(entity: Medic): Medic;
}

class MedicInfrastructure implements MedicRepository {
  insert(entity: Medic): Medic {
    throw new Error("Method not implemented.");
  }
  delete(entity: Medic): Medic {
    throw new Error("Method not implemented.");
  }
  find(medic: Medic): Medic {
    return medic;
  }
}

class DriverInfrastructure implements BaseRepository<Driver> {
  insert(entity: Driver): Driver {
    throw new Error("Method not implemented.");
  }
  delete(entity: Driver): Driver {
    throw new Error("Method not implemented.");
  }
}
