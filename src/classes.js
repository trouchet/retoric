import { isBoolean } from "lodash";
import { 
  isConjunctionProperty, 
  isDisjunctionProperty, 
  isPremiseProperty 
} from "./checkers";

import { 
  conjunctionPropertyError, 
  disjunctionPropertyError, 
  InterfaceError, 
  premisePropertyError, 
  reasoningPropertyError 
} from "./errors";
import { raise } from "./sys";

import {
  andify,
  orify,
  batchAnd,
  batchOr,
  enumerate,
  applyConclusion,
  applyArguing,
  applySummary,
  toReasoningCandidate,
} from "./utils";

const DELIMITER=':';
const LEFT_BRACKET='(';
const RIGHT_BRACKET=')';

const ambiguationMessage = 'We cannot disambiguate {Premise,Disjunction,Conjunction} on Reasoning.';
const ambiguationError = () => new InterfaceError(ambiguationMessage);

export class Reasoning {
  _conclusionMap = undefined;
  _delimiterMap = undefined;

  constructor(key, description, value) {
    const candidate = toReasoningCandidate(key, description, value);

    if(isPremiseProperty(candidate) || isConjunctionProperty(candidate)) {
      this.key = key;
      this.description = description;
      this.value = value;
    } else {
      raise(reasoningPropertyError(candidate));
    }
  }

  // Children MUST override this method
  toPremise() {
    throw ambiguationError();
  }

  // Children MUST override this method
  toArgument() {
    throw ambiguationError();
  }

  // Children MUST override this method
  toConclusion() {
    throw ambiguationError();
  }

  // Children MUST override this method
  toSummary() {
    return `${LEFT_BRACKET}${this.key}${DELIMITER}${this.value}${RIGHT_BRACKET}`;
  }

  // Children MUST override this method
  toThought() {
    return {
      arguments: this.toArgument(),
      conclusion: this.toConclusion(),
    };
  }

  toPitch() {
    return this.toArgument();
  }

  toString() {
    return this.toPitch();
  }

  argue() {
    return this.toArgument();
  }

  conclude() {
    return this.toConclusion();
  }

  summarize() {
    return this.toSummary();
  }

  think() {
    return this.toThought();
  }

  pitch() {
    return this.toPitch();
  }

  verbalize() {
    return this.toString();
  }
}

export class Premise_ extends Reasoning {
  constructor(key, description, value) {
    const candidate = toReasoningCandidate(key, description, value);

    isPremiseProperty(candidate) ? super(key, description, value) : 
    raise(premisePropertyError(candidate));    
  }

  toArgument() {
    return `${this.description}: ${this.value}`;
  }

  toConclusion() {
    return this.value;
  }

  toPremise() {
    return this;
  }
}

let junctionMixin = {
  premiseValues() {
    return applyConclusion(this.value);
  }, 
  arguments() {
    return applyArguing(this.value);
  }, 
  bullets() {
    return enumerate(this.arguments());
  }, 
  tokens() {
    return applySummary(this.value);
  }, 
  summary() {
    return this._delimiterMap(this.tokens());
  }, 
  toPitch() {
    return this.description+': '+this.conclude()+'\n'+this.bullets();
  }, 
  toPremise() {
    return new Premise_(this.key, this.description+' '+this.summary(), this.conclude());
  }, 
  toArgument() {
    return this.arguments();
  }, 
  toConclusion() {
    return this._conclusionMap(this.premiseValues());
  }, 
  verbalize() {
    return this.toPremise().toString();
  }
}

export class Conjunction_ extends Reasoning {
  constructor(key, description, value) {
    const candidate = toReasoningCandidate(key, description, value); 
    
    if(isConjunctionProperty(candidate)) {
      super(key, description, value);
      this._conclusionMap = batchAnd;
      this._delimiterMap = andify;
    } else {
      raise(conjunctionPropertyError(candidate));
    }
  }
}

export class Disjunction_ extends Reasoning {
  constructor(key, description, value) {
    const candidate = { 'key': key, 'description': description, 'value': value};    
    
    if(isDisjunctionProperty(candidate)) {
      super(key, description, value);
      this._conclusionMap = batchOr;
      this._delimiterMap = orify;
    } else {
      raise(disjunctionPropertyError(candidate));
    }
  }
}

Object.assign(Conjunction_.prototype, junctionMixin);
Object.assign(Disjunction_.prototype, junctionMixin);
