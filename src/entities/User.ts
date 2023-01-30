import { AggregateRoot } from '../core/domain/AggregateRoot';
import { UserCreated } from '../events/UserCreated';

interface UserRequired {
  name: string;
  lastname: string;
}

interface UserOptional {
  id: string;
  active: boolean;
}

export type UserProperties = UserRequired & Partial<UserOptional>;

export class User extends AggregateRoot<UserProperties> {
  private name: string;
  private lastname: string;
  private active: boolean;

  private constructor(properties: UserProperties) {
    super();
    Object.assign(this, properties);
    this.active = true;

    this.addDomainEvent(new UserCreated(this));

    /*     const log = new Log();
    log.showMessage(`User ${this.name} created`, "create"); */
  }

  static create(properties: UserProperties, id?: string): User {
    return new User(properties);
  }
}
