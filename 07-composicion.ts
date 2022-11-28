class UserInformationPersonal {
  name: string;
  lastname: string;

  constructor(name: string, lastname: string) {
    this.name = name;
    this.lastname = lastname;
  }
}

class UserSalary {
  salary: number;
  userInformationPersonal: UserInformationPersonal;

  constructor(name: string, lastname: string, salary: number) {
    this.userInformationPersonal = new UserInformationPersonal(name, lastname);
    this.salary = salary;
  }

  getInfomarmation() {
    return `User: ${this.userInformationPersonal.name} ${this.userInformationPersonal.lastname}. Salary: ${this.salary}`;
  }
}

const userSalary = new UserSalary("Juan", "Pérez", 5000);
console.log("userSalary", userSalary);
