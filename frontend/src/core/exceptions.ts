export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

export class BadAuthorisationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BadAuthorisationError";
  }
}

export class IncompatibleError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "IncompatibleError";
  }
}
