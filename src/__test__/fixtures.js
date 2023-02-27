import { Conjunction, Disjunction, Premise, Reasoning } from "../classes";

// Reasons
export const reason = new Reasoning("reason", "This is a reason", true);

// Premises
export const truePremise = new Premise("true_premise", "This is a true premise", true);
export const falsePremise = new Premise("false_premise", "This is a false premise", false);

export const expectedTruePremiseArgument = { true_premise: true };
export const expectedFalsePremiseArgument = { false_premise: false };
export const expectedTruePremiseConclusion = true;
export const expectedFalsePremiseConclusion = false;

export const premises = [truePremise, falsePremise];

export const expectedPremisesEntries = [
  ["true_premise", true],
  ["false_premise", false],
];

export const expectedPremisesKeys = ["true_premise", "false_premise"];
export const expectedPremisesArguments = [{ true_premise: true }, { false_premise: false }];
export const expectedPremisesConclusions = [true, false];
export const expectedPremisesVerbalizations = ["(true_premise:true)", "(false_premise:false)"];

// Premise artifacts
export const premiseArtifacts = [
  [truePremise, truePremise],
  [truePremise, falsePremise],
  [falsePremise, truePremise],
  [falsePremise, falsePremise],
];

// Disjunctions and conjunctions
export const disjunctions = [];
export const conjunctions = [];

let disjunction, conjunction;
let injprops, conjprops;

const descriptionCallback = (name, premise) => `This is a [${premise}] ${name}`;

for (const i in premiseArtifacts) {
  injprops = {
    key: `disjunction_${i}`,
    description: descriptionCallback("disjunction", premiseArtifacts[i]),
    value: premiseArtifacts[i],
  };

  conjprops = {
    key: `conjunction_${i}`,
    description: descriptionCallback("conjunction", premiseArtifacts[i]),
    value: premiseArtifacts[i],
  };

  disjunction = new Disjunction(injprops.key, injprops.description, injprops.value);
  conjunction = new Conjunction(conjprops.key, conjprops.description, conjprops.value);

  disjunctions.push(disjunction);
  conjunctions.push(conjunction);
}

// Arguments
export const expectedInjConjArguments = [
  { true_premise: true, true_premise: true },
  { true_premise: true, false_premise: false },
  { false_premise: false, true_premise: true },
  { false_premise: false, false_premise: false },
];

// Disjunctions

export const expectedDisjunctionsConclusions = [true, true, true, false];
export const expectedDisjunctionsVerbalizations = [
  "(disjunction_0=(true_premise:true)|(true_premise:true):true)",
  "(disjunction_1=(true_premise:true)|(false_premise:false):true)",
  "(disjunction_2=(false_premise:false)|(true_premise:true):true)",
  "(disjunction_3=(false_premise:false)|(false_premise:false):false)",
];

// Conjunctions

export const expectedConjunctionsConclusions = [true, false, false, false];
export const expectedConjunctionsVerbalizations = [
  "(conjunction_0=(true_premise:true)&(true_premise:true):true)",
  "(conjunction_1=(true_premise:true)&(false_premise:false):false)",
  "(conjunction_2=(false_premise:false)&(true_premise:true):false)",
  "(conjunction_3=(false_premise:false)&(false_premise:false):false)",
];

// Single premise conjunctions
export let singlePremiseConjunction, singlePremiseDisjunction;

injprops = {
  key: `singlePremiseDisjunction`,
  description: descriptionCallback("disjunction", truePremise),
  value: truePremise,
};

singlePremiseDisjunction = new Disjunction(injprops.key, injprops.description, injprops.value);

export const expectedSinglePremiseDisjunctionConclusion = true;

// Single premise disjunctions
conjprops = {
  key: `singlePremiseConjunction`,
  description: descriptionCallback("conjunction", truePremise),
  value: falsePremise,
};

singlePremiseConjunction = new Conjunction(conjprops.key, conjprops.description, conjprops.value);

export const expectedSinglePremiseConjunctionConclusion = false;
