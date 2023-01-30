import { DomainEvents } from '../events/DomainEvents';
import { UserCreated } from '../events/UserCreated';

export class Register {
  constructor() {
    DomainEvents.register(this.messageWelcome, UserCreated.name);
  }

  messageWelcome(evt: any) {
    console.log(`Welcome ${evt.user.name} ${evt.user.lastname}`);
  }
}
