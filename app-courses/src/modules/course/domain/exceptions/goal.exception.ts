import { DomainException } from './domain';

export class GoalInvalidQuantityItemsException extends DomainException {
  status = 411;

  constructor(message: number) {
    super(GoalInvalidQuantityItemsException.getMessageError(message));
  }

  static getMessageError(message: number) {
    return `Goals must be at least 3 items long. You only have ${message} items.`;
  }
}

export class GoalEmptyDescriptionException extends DomainException {
  status = 411;

  constructor() {
    super(GoalEmptyDescriptionException.getMessageError());
  }

  static getMessageError() {
    return `You must provide a description for each goal.`;
  }
}
