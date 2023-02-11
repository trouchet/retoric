export class NotImplementedError extends Error {
  constructor(message = "") {
    super(message);
    this.name = "NotImplementedError";
  }
}

export class InterfaceError extends NotImplementedError {
  constructor() {
    super("This is an interface.");
    this.name = "InterfaceError";
  }
}

export class OperationError extends TypeError {
  constructor() {
    super("Batch operations expect a list of true-isCallback values.");
    this.name = "OperationError";
  }
}
