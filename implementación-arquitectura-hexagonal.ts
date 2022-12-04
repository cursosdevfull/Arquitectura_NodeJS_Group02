// Domain
const patternEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

class User {
  name: string;
  lastname: string;
  email: string;
  age: number;
  gender: boolean;

  constructor(
    name: string,
    lastname: string,
    email: string,
    age: number,
    gender: boolean
  ) {
    if (name.trim().length === 0) {
      throw new Error("Name cannot empty");
    }

    if (name.trim().length < 4) {
      throw new Error("Length must great than 4");
    }

    if (!patternEmail.test(email)) {
      throw new Error("Email invalid");
    }

    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.age = age;
    this.gender = gender;
  }
}

interface UserRepository {
  insert(user: User): User;
}

// Application
class UserApplication {
  readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  add(user: User): User {
    return this.userRepository.insert(user);
  }
}

// Infrastructure
class UserInfrastructure implements UserRepository {
  insert(user: User): User {
    console.log("User inserted", user);
    return user;
  }
}

const user = new User("Carla", "Buendía", "carla@correo.com", 35, false);
const infrastructure = new UserInfrastructure();
const application = new UserApplication(infrastructure);
application.add(user);
