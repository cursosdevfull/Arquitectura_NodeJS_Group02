export abstract class DomainException extends Error {
  abstract status: number;

  constructor(message?: string) {
    super(message);
  }
}
