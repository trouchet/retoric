import { 
  isArray, 
  isBoolean, 
  isObject, 
  isString, 
  isUndefined 
} from "lodash";
import { is } from "arqeo";

import { Conjunction_, Disjunction_, Premise_, Reasoning } from "./classes";
import { raise } from "./sys";
import { UnexpectedReasoningError } from "./errors";

export const isDefined = (candidate) => !isUndefined(candidate);
export const isReasoning = (candidate) => candidate instanceof Reasoning;
export const isPremise = (candidate) => candidate instanceof Premise_;
export const isConjunction = (candidate) => candidate instanceof Conjunction_;
export const isDisjunction = (candidate) => candidate instanceof Disjunction_;

export const reasoningType = (candidate) => {
  if(isPremise(candidate)) {
    return "Premise";
  } else if(isConjunction(candidate)) {
    return "Conjunction";
  } else if(isDisjunction(candidate)) {
    return "Disjunction";
  } else {
    raise(UnexpectedReasoningError)
  }
};

export const isReasoningArtifact = (candidate) => is(candidate, isReasoning);
export const isPremiseArtifact = (candidate) => is(candidate, isPremise);
export const isDisjunctionArtifact = (candidate) => is(candidate, isDisjunction);
export const isConjunctionArtifact = (candidate) => is(candidate, isConjunction);

export const isPremiseArtifactArray = (candidate) => 
    isPremiseArtifact(candidate) && isArray(candidate);

export const isPremiseProperty = (candidate) => {
    if(isObject(candidate)) {
      return isString(candidate?.key) && 
             isString(candidate?.description) && 
             isBoolean(candidate?.value);
    } else {
      return false;
    }
};

export const isConjunctionProperty = (candidate) => {
    if(isObject(candidate)) {
      return isString(candidate?.key) && 
             isString(candidate?.description) && 
             isPremiseArtifactArray(candidate?.value);
    } else {
      return false;
    }
};

export const isDisjunctionProperty = (candidate) => {
    if(isObject(candidate)) {
      return isString(candidate?.key) && 
             isString(candidate?.description) && 
             isPremiseArtifactArray(candidate?.value);
    } else {
      return false;
    }
};
