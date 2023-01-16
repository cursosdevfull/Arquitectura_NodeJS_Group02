import { BaseException } from '../../../../core/exceptions/base';

export class SyllabusInvalidQuantityItemsException extends BaseException {
  status = 411;

  constructor(message: number) {
    super(SyllabusInvalidQuantityItemsException.getMessageError(message));
  }

  static getMessageError(message: number) {
    return `Syllabus must be at least 3 items long. You only have ${message} items.`;
  }
}

export class SyllabusEmptyDescriptionException extends BaseException {
  status = 411;

  constructor() {
    super(SyllabusEmptyDescriptionException.getMessageError());
  }

  static getMessageError() {
    return `You must provide a description for each syllabus.`;
  }
}
