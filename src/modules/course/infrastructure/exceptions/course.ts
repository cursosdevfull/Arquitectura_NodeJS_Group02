import { BaseException } from 'src/core/exceptions/base';

export class CourseDatabaseException extends BaseException {
  status = 500;

  constructor(message: string) {
    super(CourseDatabaseException.getMessageError(message));
  }

  static getMessageError(message: string) {
    return `An error ocurred while inserting the course into the database: ${message}`;
  }
}
