import { User, UserProperties } from './entities/User';

const userProperties: UserProperties = {
  name: "John",
  lastname: "Doe",
};

const user = User.create(userProperties);

console.log(user);
