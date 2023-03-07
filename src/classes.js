import { isArray, isBoolean } from "lodash";
import { isPremiseArtifact } from "./checkers";

import { InterfaceError, ReasoningError } from "./errors";

import {
  andify,
  orify,
  applyReasoningArtifact,
  batchAnd,
  batchOr,
  getPremisesEntries,
  enumerate,
} from "./utils";

export class Reasoning {
  _conclusionMap = undefined;

  constructor(key, description, value) {
    this.key = key;
    this.description = description;
    this.value = value;
  }

  // Children MUST override this method
  toPremise() {
    throw new InterfaceError();
  }

  // Children MUST override this method
  toArgument() {
    throw new InterfaceError();
  }

  toPitch() {
    return `${this.description}: ${this.value}`;
  }

  // Children MUST override this method
  toConclusion() {
    throw new InterfaceError();
  }

  // Children MUST override this method
  toThought() {
    return {
      arguments: this.toArgument(),
      conclusion: this.toConclusion(),
    };
  }

  toString() {
    return this.verbalize();
  }

  pitch() {
    return this.toPitch();
  }

  argue() {
    return this.toArgument();
  }

  conclude() {
    return this.toConclusion();
  }

  think() {
    return this.toThought();
  }

  // Children MUST override this method
  verbalize() {
    throw new InterfaceError();
  }
}

export class Premise extends Reasoning {
  constructor(key, description, value) {
    super(key, description, value);
  }

  toArgument() {
    return Object.fromEntries([[this.key, this.value]]);
  }

  toConclusion() {
    return this.value;
  }

  toPremise() {
    return this;
  }

  verbalize() {
    return `(${this.key}:${this.value})`;
  }
}

export class Conjunction extends Reasoning {
  constructor(key, description, value) {
    if(isPremiseArtifact(value) && isArray(value)) {
      super(key, description, value);
      this._conclusionMap = batchAnd;
    } else {
      throw new ReasoningError();
    }
  }

  toPremise() {
    const talkMap = (premise) => premise.verbalize();
    const arguments_ = andify(applyReasoningArtifact(this.value, talkMap));
    const conjunctionAsPremiseKey = `${this.key}=${arguments_}`;

    return new Premise(conjunctionAsPremiseKey, this.description, this.conclude());
  }

  toArgument() {
    return Object.fromEntries(getPremisesEntries(this.value));
  }

  toPitch() {
    const descriptionMap = (reason) => reason.toPitch();
    const descriptions = applyReasoningArtifact(this.value, descriptionMap);

    return enumerate(descriptions);
  }

  toConclusion() {
    const concludeMap = (reason) => reason.conclude();
    const conclusion = applyReasoningArtifact(this.value, concludeMap);

    return this._conclusionMap(conclusion);
  }

  verbalize() {
    return this.toPremise().toString();
  }
}

export class Disjunction extends Reasoning {
  constructor(key, description, value) {
    if(isPremiseArtifact(value) && isArray(value)) {
      super(key, description, value);
      this._conclusionMap = batchOr;
    } else {
      throw new ReasoningError();
    }
  }

  toPremise() {
    const talkMap = (premise) => premise.verbalize();
    const arguments_ = orify(applyReasoningArtifact(this.value, talkMap));
    const disjunctionAsPremiseKey = `${this.key}=${arguments_}`;

    return new Premise(disjunctionAsPremiseKey, this.description, this.conclude());
  }

  toArgument() {
    return Object.fromEntries(getPremisesEntries(this.value));
  }

  toConclusion() {
    const concludeMap = (premise) => premise.conclude();
    const conclusion = applyReasoningArtifact(this.value, concludeMap);

    return this._conclusionMap(conclusion);
  }

  verbalize() {
    return this.toPremise().toString();
  }
}
