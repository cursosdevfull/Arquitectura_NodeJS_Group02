class User {
  /* name: string
    lastname: string

    constructor(name: string, lastname: string) {
        this.name = name
        this.lastname = lastname
    } */

  constructor(public name: string, public lastname: string) {}
}

const user = new User("John", "Wayne");
console.log(user);

interface UserRepository {
  insert(user: User): User;
  getAll(): User[];
}

class UserInfrastructure implements UserRepository {
  insert(user: User): User {
    this.trace("user inserted");
    return user;
  }

  getAll(): User[] {
    this.trace("2 users returned");
    return [new User("Jorge", "Castro"), new User("Claudia", "Cáceres")];
  }

  trace(message: string) {
    console.log(message);
  }
}

class UserApplication {
  /*userRepository: UserRepository

    constructor(userRepository: UserRepository){
        //this.userInfrastructure = new UserInfrastructure()
        this.userRepository = userRepository
    }
    */

  constructor(private readonly userRepository: UserRepository) {}

  addUser(user: User) {
    //this.userRepository.trace("Hola")
    return this.userRepository.insert(user);
  }

  listUsers() {
    return this.userRepository.getAll();
  }
}

const userRepository: UserRepository = new UserInfrastructure();
const userApplication: UserApplication = new UserApplication(userRepository);
const userObj = new User("Carlos", "Quintana");
console.log(userApplication.addUser(userObj));
