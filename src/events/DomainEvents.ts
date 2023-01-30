import { AggregateRoot } from '../core/domain/AggregateRoot';

export class DomainEvents {
  static handlerMap: any = {};
  static markedAggregates: AggregateRoot<any>[] = [];

  static register(cb: (evt: any) => void, eventClassName: string) {
    if (!this.handlerMap[eventClassName]) {
      this.handlerMap[eventClassName] = [];
    }
    this.handlerMap[eventClassName].push(cb);
  }

  static dispatchEventsForAggregate(id: string) {
    const found = this.findMarkedAggregateById(id);
    if (found) {
      this.dispatchAggregateEvents(found);
      found.clearEvents();
      this.removeAggregateMarkedDispatchList(found);
    }
  }

  static removeAggregateMarkedDispatchList(agg: AggregateRoot<any>) {
    const index = this.markedAggregates.indexOf(agg);
    if (index > -1) {
      this.markedAggregates.splice(index, 1);
    }
  }

  static dispatchAggregateEvents(agg: AggregateRoot<any>) {
    agg.domainEvents.forEach((evt) => {
      this.dispatch(evt);
    });
  }

  static dispatch(evt: any) {
    console.log("handlerMap", this.handlerMap);
    const handlers = this.handlerMap[evt.constructor.name];
    console.log("handlers", handlers);
    if (handlers) {
      handlers.forEach((cb: any) => {
        cb(evt);
      });
    }
  }

  static findMarkedAggregateById(id: string): AggregateRoot<any> {
    let found = null;
    for (let agg of this.markedAggregates) {
      if (agg.getId() === id) {
        found = agg;
        break;
      }
    }

    return found;
  }

  static markAggregateForDispatch(agg: AggregateRoot<any>) {
    const found = !!this.findMarkedAggregateById(agg.getId());
    if (!found) {
      this.markedAggregates.push(agg);
    }
  }
}
