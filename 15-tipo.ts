/* interface IUserEssential {
    readonly userId: string
    readonly name: string
    readonly lastname: string
    readonly email: string
}

interface IUserOptional {
    readonly age: number
    readonly gender: boolean
    readonly tall: number
} */

type UserProperties = {
  userId: string;
  name: string;
  lastname: string;
  email: string;
  age: number;
  gender: boolean;
  tall: number;
};

class User {
  private readonly userId: string;
  private name: string;
  private lastname: string;
  private age: number;
  private gender: boolean;
  private readonly email: string;
  private tall: number;

  constructor(properties: UserProperties) {
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

const properties: UserProperties = {
  userId: "933ae221-26c7-4d21-b717-b2e0f575610d",
  name: "Carmen",
  lastname: "Alegría",
  age: 40,
  gender: false,
  email: "carmen.alegria@gmail.com",
  tall: 172,
};

//properties.userId = "a3359355-2da1-4d22-9e53-cd45a8b6b4bc"
const user = new User(properties);
console.log(user);
