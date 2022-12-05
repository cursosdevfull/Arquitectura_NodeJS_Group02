export class User {
  id: string;
  name: string;
  email: string;
  username: string;
  password: string;

  constructor(
    id: string,
    name: string,
    email: string,
    username: string,
    password: string,
  ) {
    if (name.trim().length === 0) {
      throw new Error('Name is required');
    }

    if (name.trim().length < 3) {
      throw new Error('Name is too short');
    }

    this.id = id;
    this.name = name;
    this.email = email;
    this.username = username;
    this.password = password;
  }
}
