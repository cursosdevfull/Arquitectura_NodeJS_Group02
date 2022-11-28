class User {
  protected readonly userId = "0bf55d39-0325-46f8-a952-32289569448d";
  protected readonly passwordDBCipher = "29Khwk7i*LmY";
}

class UserDeveloper extends User {
  get userDeveloperId() {
    return this.userId;
  }

  compare(password: string) {
    this.match(password, this.passwordDBCipher);
  }

  match(password: string, passwordDBCipher: string) {
    return false;
  }
}

const userDeveloper = new UserDeveloper();
//console.log(userDeveloper.userId)
console.log(userDeveloper.userDeveloperId);
