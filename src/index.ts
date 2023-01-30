import { Log } from './entities/Log';
import { Marketing } from './entities/Marketing';
import { Register } from './entities/Register';
import { User, UserProperties } from './entities/User';
import { DomainEvents } from './events/DomainEvents';

const log = new Log();
const register = new Register();
const marketing = new Marketing();

const userProperties: UserProperties = {
  name: "John",
  lastname: "Doe",
};

const user = User.create(userProperties);

console.log(user.domainEvents);

DomainEvents.dispatchEventsForAggregate(user.getId());
DomainEvents.dispatchEventsForAggregate(user.getId());
