import { Conjunction_, Disjunction_, Premise_, Reasoning } from "../classes";

// Reasons
export const reason = new Reasoning("reason", "This is a reason", true);

// Premises
export const truePremise = new Premise_("true_premise", "This is a true premise", true);
export const falsePremise = new Premise_("false_premise", "This is a false premise", false);

export const expectedTruePremiseConclusion = true;
export const expectedFalsePremiseConclusion = false;

export const premises = [truePremise, falsePremise];

export const expectedPremisesEntries = [
  ["true_premise", true],
  ["false_premise", false],
];

export const expectedPremisesKeys = ["true_premise", "false_premise"];
export const expectedPremisesPitches = ["This is a true premise: true", "This is a false premise: false"];
export const expectedPremisesConclusions = [true, false];
export const expectedPremisesVerbalizations = [ 
  "This is a true premise: true", 
  "This is a false premise: false"
];

// Premise artifacts
export const premiseArtifacts = [
  [truePremise, truePremise], 
  [truePremise, falsePremise], 
  [falsePremise, truePremise], 
  [falsePremise, falsePremise],
];

export const expectedSingleInjConjKeys = ["disjunctionKey", "conjunctionKey"];
export const expectedSingleInjConjPitches = [
  'This is a single-premise disjunction: true', 
  'This is a single-premise conjunction: false'
];

export const expectedSingleInjConjConclusions = [true, false];
export const expectedSingleInjConjVerbalizations = ["(true_premise:true)", "(false_premise:false)"];

// Disjunctions and conjunctions
export const disjunctions = [];
export const conjunctions = [];

export let disjunction, conjunction;
let injprops, conjprops;

const descriptionCallback = (name) => `This is a ${name}`;

for (const i in premiseArtifacts) {
  injprops = {
    key: `disjunction_${i}`,
    description: descriptionCallback("disjunction"),
    value: premiseArtifacts[i],
  };

  conjprops = {
    key: `conjunction_${i}`,
    description: descriptionCallback("conjunction"),
    value: premiseArtifacts[i],
  };

  disjunction = new Disjunction_(injprops.key, injprops.description, injprops.value);
  conjunction = new Conjunction_(conjprops.key, conjprops.description, conjprops.value);

  disjunctions.push(disjunction);
  conjunctions.push(conjunction);
}

// Pitches
export const expectedConjunctionPitches = [
  "This is a conjunction: true\n0. This is a true premise: true\n1. This is a true premise: true",
  "This is a conjunction: false\n0. This is a true premise: true\n1. This is a false premise: false",
  "This is a conjunction: false\n0. This is a false premise: false\n1. This is a true premise: true",
  "This is a conjunction: false\n0. This is a false premise: false\n1. This is a false premise: false"
];

export const expectedDisjunctionsPitches = [
  "This is a disjunction: true\n0. This is a true premise: true\n1. This is a true premise: true",
  "This is a disjunction: true\n0. This is a true premise: true\n1. This is a false premise: false",
  "This is a disjunction: true\n0. This is a false premise: false\n1. This is a true premise: true",
  "This is a disjunction: false\n0. This is a false premise: false\n1. This is a false premise: false"
];

export const expectedJunctionsArguments = [
  ["This is a true premise: true", "This is a true premise: true"],
  ["This is a true premise: true", "This is a false premise: false"],
  ["This is a false premise: false", "This is a true premise: true"],
  ["This is a false premise: false", "This is a false premise: false"]
];

// Disjunctions

// Verbalizations
export const expectedDisjunctionsVerbalizations = [
  "This is a disjunction (true_premise:true)|(true_premise:true): true", 
  "This is a disjunction (true_premise:true)|(false_premise:false): true", 
  "This is a disjunction (false_premise:false)|(true_premise:true): true", 
  "This is a disjunction (false_premise:false)|(false_premise:false): false"
]

// Conclusions
export const expectedDisjunctionsConclusions = [true, true, true, false];

// Conjunctions

// Verbalizations
export const expectedConjunctionsVerbalizations = [
  "This is a conjunction (true_premise:true)&(true_premise:true): true", 
  "This is a conjunction (true_premise:true)&(false_premise:false): false", 
  "This is a conjunction (false_premise:false)&(true_premise:true): false", 
  "This is a conjunction (false_premise:false)&(false_premise:false): false"
]

// Conclusions
export const expectedConjunctionsConclusions = [true, false, false, false];
