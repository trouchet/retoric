import { isBoolean, isNumber, isString } from "lodash";
import { isPremiseArtifactArray } from "./checkers";
import { Conjunction, Premise } from "./classes";

export class NotImplementedError extends Error {
  constructor(message = "") {
    super(message);
    this.name = "NotImplementedError";
  }
}

export class InterfaceError extends NotImplementedError {
  constructor(message='') {
    super(`This is an interface. ${message}`);
    this.name = "InterfaceError";
  }
}

export class OperationError extends TypeError {
  constructor() {
    super("Batch operations expect a list of true-isCallback values.");
    this.name = "OperationError";
  }
}

export class UnexpectedReasoningError extends TypeError {
  constructor() {
    super("We expected a Reasoning candidate i.e. {Reasoning, Premise, Conjunction, Disjunction}.");
    this.name = "UnexpectedReasoningError";
  }
}

const reasoningErrorMap = {
  '-1': 'Reasoning',
  '0': 'Premise',
  '1': 'Conjunction',
  '2': 'Disjunction',
}

export class ReasoningPropertyError extends TypeError {
  constructor(candidateProps, claimedCandidateType) {
    let candidateType, suggestionMessage, premises;
    let reasoning;
    let emessage;

    const isReasoningType = isNumber(claimedCandidateType) && 
      (claimedCandidateType >=0) && (claimedCandidateType <= 2)

    if(isReasoningType) {
      if(claimedCandidateType===-1) {
        premises=[
          new Premise(
            'keyIsString', 
            'Property key must be string', 
            isString(candidateProps.key)
          ),
          new Premise(
            'descriptionIsString', 
            'Property key must be string', 
            isString(candidateProps.description)
          ),
          new Premise(
            'valueIsBooleanOrPremise2Array', 
            'Property value must be boolean or a Premise Array array with at least 2 elements', 
            isBoolean(candidateProps.value) || isPremiseArtifactArray(candidateProps.value)
          ),
        ];
        
        suggestionMessage = '';

      } else if(claimedCandidateType===0) {
        premises=[
          new Premise(
            'keyIsString', 
            'Property key must be string', 
            isString(candidateProps.key)
          ),
          new Premise(
            'descriptionIsString', 
            'Property key must be string', 
            isString(candidateProps.description)
          ),
          new Premise(
            'valueIsBoolean', 
            'Property value must be boolean', 
            isBoolean(candidateProps.value)
          ),
        ];
        
        suggestionMessage = '';

      } else if(claimedCandidateType===1 || claimedCandidateType===2) {
        premises=[
          new Premise(
            'keyIsString', 
            'Property key must be string', 
            isString(candidateProps.key)
          ),
          new Premise(
            'descriptionIsString', 
            'Property key must be string', 
            isString(candidateProps.description)
          ),
          new Premise(
            'valueIsBoolean', 
            'Property value must be a Premise Array array with at least 2 elements', 
            isPremiseArtifactArray(candidateProps.value) ? candidateProps.value.length >= 2 : false
          ),
        ];

        suggestionMessage = "In case you have a single Reasoning object, we suggest to use Premise class."
      } else {
      emessage=`Candidate type must be ${JSON.stringify(reasoningErrorMap)}`;
      throw TypeError(emessage);
      }
    }
    
    candidateType=reasoningErrorMap[claimedCandidateType];

    reasoning = new Conjunction(
      `${candidateType}Advocate`, `A ${candidateType} on Reasoning must have valid properties`, premises
    )

    const headerMessage = `${candidateType} properties (key, description, value) must: `;
    
    super(headerMessage+"\n"+reasoning.pitch()+"\n"+suggestionMessage);
    this.name = "ReasoningError";
  }
}
