class User {
  private readonly userId: string;
  private readonly email: string;
  private password: string;
  private name: string;
  private age: number;

  constructor(
    userId: string,
    email: string,
    name: string,
    age: number,
    password: string
  ) {
    this.userId = userId;
    this.email = email;
    this.name = name;
    this.age = age;
    this.password = password;
  }

  update(name: string, age: number, password: string) {
    this.name = name;
    this.age = age;
    this.password = password;
  }

  getProperties() {
    return {
      userId: this.userId,
      email: this.email,
      name: this.name,
      age: this.age,
    };
  }
}

const user = new User(
  "d7687c85-aa31-4fa8-91c7-ececc5eed877",
  "user@correo.com",
  "User01",
  20,
  "n1XVm@q*A088"
);
//user.userId = "a31bb1c3-e3b0-4c41-a4ca-b8f0c2e2018c"
//console.log(user.password)
//user.email = "newEmail@email.com"
console.log(user.getProperties());
