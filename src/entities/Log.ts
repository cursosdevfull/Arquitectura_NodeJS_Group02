import { DomainEvents } from '../events/DomainEvents';
import { UserCreated } from '../events/UserCreated';

export class Log {
  constructor() {
    DomainEvents.register(this.showMessage, UserCreated.name);
  }

  showMessage(evt: any) {
    console.log("Log", evt);
  }
}
