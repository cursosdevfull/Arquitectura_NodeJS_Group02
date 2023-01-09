import { DomainException } from './domain';

export class RequerimentInvalidQuantityItemsException extends DomainException {
  status = 411;

  constructor(message: number) {
    super(RequerimentInvalidQuantityItemsException.getMessageError(message));
  }

  static getMessageError(message: number) {
    return `Requeriments must be at least 3 items long. You only have ${message} items.`;
  }
}

export class RequerimentEmptyDescriptionException extends DomainException {
  status = 411;

  constructor() {
    super(RequerimentEmptyDescriptionException.getMessageError());
  }

  static getMessageError() {
    return `You must provide a description for each requeriment.`;
  }
}
