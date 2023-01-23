export abstract class BaseException extends Error {
  abstract status: number;

  constructor(message?: string) {
    super(message);
  }
}
