export abstract class AggregateRoot<T> {
  private _domainEvents: any[] = [];

  protected addDomainEvent(domainEvent: any) {
    this._domainEvents.push(domainEvent);
  }
}
