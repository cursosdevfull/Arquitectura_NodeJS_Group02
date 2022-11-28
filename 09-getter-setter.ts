class UserInformationPersonal {
  name: string;
  lastname: string;

  constructor(name: string, lastname: string) {
    this.name = name;
    this.lastname = lastname;
  }
}

class UserSalary {
  private _salary: number;
  userInformationPersonal: UserInformationPersonal;

  constructor(
    userInformationPersonal: UserInformationPersonal,
    salary: number
  ) {
    this.userInformationPersonal = userInformationPersonal;
    this._salary = salary;
  }

  getInformation() {
    return `User: ${this.userInformationPersonal.name} ${this.userInformationPersonal.lastname}. Salary: ${this.salary}`;
  }

  get gSalary() {
    return this._salary;
  }

  set sSalary(salary: number) {
    this._salary = salary;
  }
}
const userInformationPersonal = new UserInformationPersonal("Juan", "Pérez");
const userSalary = new UserSalary(userInformationPersonal, 5000);
console.log("userSalary", userSalary);

/* console.log("salary", userSalary.getSalary())
userSalary.setSalary(10000)
console.log("salary", userSalary.getSalary()) */

console.log("salary", userSalary.gSalary);
userSalary.sSalary = 30000;
console.log("salary", userSalary.gSalary);
