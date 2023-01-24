import { User } from 'src/entities/User';

export class UserCreated {
  user: User;
  dateTimeOcurred: Date;

  constructor(user: User) {
    this.user = user;
    this.dateTimeOcurred = new Date();
  }
}
