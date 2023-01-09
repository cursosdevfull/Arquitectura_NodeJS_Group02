import { DomainException } from './domain';

export class SyllabusInvalidQuantityItemsException extends DomainException {
  status = 411;

  constructor(message: number) {
    super(SyllabusInvalidQuantityItemsException.getMessageError(message));
  }

  static getMessageError(message: number) {
    return `Syllabus must be at least 3 items long. You only have ${message} items.`;
  }
}

export class SyllabusEmptyDescriptionException extends DomainException {
  status = 411;

  constructor() {
    super(SyllabusEmptyDescriptionException.getMessageError());
  }

  static getMessageError() {
    return `You must provide a description for each syllabus.`;
  }
}
