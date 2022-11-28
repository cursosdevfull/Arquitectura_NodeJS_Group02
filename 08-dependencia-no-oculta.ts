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

  constructor(
    userInformationPersonal: UserInformationPersonal,
    salary: number
  ) {
    this.userInformationPersonal = userInformationPersonal;
    this.salary = salary;
  }

  getInfomarmation() {
    return `User: ${this.userInformationPersonal.name} ${this.userInformationPersonal.lastname}. Salary: ${this.salary}`;
  }
}
const userInformationPersonal = new UserInformationPersonal("Juan", "Pérez");
const userSalary = new UserSalary(userInformationPersonal, 5000);
console.log("userSalary", userSalary);
