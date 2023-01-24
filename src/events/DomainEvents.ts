export class DomainEvents {
  static handlerMap: any = {};

  static register(cb: () => void, eventClassName: string) {
    if (!this.handlerMap[eventClassName]) {
      this.handlerMap[eventClassName] = [];
    }
    this.handlerMap[eventClassName].push(cb);
  }
}
