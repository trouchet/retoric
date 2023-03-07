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

export class ReasoningError extends TypeError {
  constructor() {
    const constitutionMessage = "Conjunction and injunction values must be an array of Premise.";
    const suggestionMessage = "In case you have a single Reasoning object, we suggest to use the Premise class."
    
    super(constitutionMessage+" "+suggestionMessage);
    this.name = "ReasoningError";
  }
}
