import { DomainEvents } from '../events/DomainEvents';
import { UserCreated } from '../events/UserCreated';

export class Marketing {
  constructor() {
    DomainEvents.register(this.processNewUser, UserCreated.name);
  }

  processNewUser(evt: any) {
    console.log(`Sent gift to ${evt.user.name} ${evt.user.lastname}`);
  }
}
