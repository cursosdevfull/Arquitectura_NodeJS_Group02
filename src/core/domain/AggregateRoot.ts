import { v4 as uuidv4 } from 'uuid';

import { DomainEvents } from '../../events/DomainEvents';

export abstract class AggregateRoot<T> {
  private _domainEvents: any[] = [];
  private readonly id: string;

  constructor() {
    this.id = uuidv4();
  }

  protected addDomainEvent(domainEvent: any) {
    this._domainEvents.push(domainEvent);
    DomainEvents.markAggregateForDispatch(this);
  }

  get domainEvents() {
    return this._domainEvents;
  }

  getId() {
    return this.id;
  }

  clearEvents() {
    this._domainEvents = [];
    //this._domainEvents.splice(0, this._domainEvents.length);
  }
}
