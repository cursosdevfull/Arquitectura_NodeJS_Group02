interface IUserEssential {
  userId: string;
  name: string;
  lastname: string;
  email?: string;
}

interface IUserOptional {
  age: number;
  gender: boolean;
  tall: number;
}

class User {
  private readonly userId: string;
  private name: string;
  private lastname: string;
  private age: number;
  private gender: boolean;
  private readonly email: string;
  private tall: number;

  constructor(properties: Required<IUserEssential> & Partial<IUserOptional>) {
    Object.assign(this, properties);
    /*     this.userId = properties.userId
        this.name = properties.name
        this.lastname = properties.lastname
        this.age = properties.age
        this.gender = properties.gender
        this.email = properties.email
        this.tall = properties.tall */
  }
}

const properties: Required<IUserEssential> & Partial<IUserOptional> = {
  userId: "933ae221-26c7-4d21-b717-b2e0f575610d",
  name: "Carmen",
  lastname: "Alegría",
  //age: 40,
  gender: false,
  email: "carmen.alegria@gmail.com",
  tall: 172,
};
const user = new User(properties);
