import { BaseException } from '../../../../core/exceptions/base';

export class IdVOInvalidException extends BaseException {
  status = 411;

  constructor(message: string) {
    super(IdVOInvalidException.getMessageError(message));
  }

  static getMessageError(message: string) {
    return `Id invalid: ${message}`;
  }
}
