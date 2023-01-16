import { BaseException } from '../../../../core/exceptions/base';

export class NameEmptyException extends BaseException {
  status = 411;

  constructor() {
    super(NameEmptyException.getMessage());
  }

  static getMessage() {
    return 'Name cannot be empty.';
  }
}

export class NameLengthException extends BaseException {
  status = 411;

  constructor(message: number) {
    super(NameLengthException.getMessage(message));
  }

  static getMessage(message: number) {
    return `Name must be at least 10 characters long. You only have ${message} characters.`;
  }
}

export class NameInvalidWordsException extends BaseException {
  status = 411;

  constructor(message: number) {
    super(NameInvalidWordsException.getMessage(message));
  }

  static getMessage(message: number) {
    return `Name must contain at least 3 words. You only have ${message} words.`;
  }
}
