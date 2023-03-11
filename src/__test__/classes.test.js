import { Conjunction, Disjunction, Premise } from "../classes";
import { InterfaceError, ReasoningError } from "../errors";
import { 
  applyConclusion, 
  applyPitch, 
  applyVerbalization
} from "../utils";
import { 
  disjunctions,
  premises,
  truePremise,
  falsePremise,
  expectedPremisesConclusions,
  expectedPremisesVerbalizations,
  expectedDisjunctionsConclusions,
  reason,
  expectedTruePremiseConclusion,
  expectedFalsePremiseConclusion,
  expectedConjunctionsConclusions,
  conjunctions,
  expectedConjunctionsVerbalizations,
  expectedDisjunctionsVerbalizations,
  expectedInjConjPitches,
} from "./fixtures";

// Apply callbacks


describe("classes", () => {
  it("must throw on (toPremise, toConclusion, toThought) on Reasoning object", () => {
    let throwErrorOnToPremise,
      throwErrorOnToConclusion,
      throwErrorOnToArgument,
      throwErrorOnToThought,
      throwErrorOnVerbalize;

    throwErrorOnToPremise = () => reason.toPremise();
    expect(throwErrorOnToPremise).toThrow(InterfaceError);
    
    throwErrorOnToArgument = () => reason.toArgument();
    expect(throwErrorOnToArgument).toThrow(InterfaceError);

    throwErrorOnToArgument = () => reason.argue();
    expect(throwErrorOnToArgument).toThrow(InterfaceError);

    throwErrorOnToConclusion = () => reason.toConclusion();
    expect(throwErrorOnToConclusion).toThrow(InterfaceError);

    throwErrorOnToConclusion = () => reason.conclude();
    expect(throwErrorOnToConclusion).toThrow(InterfaceError);

    throwErrorOnToThought = () => reason.toThought();
    expect(throwErrorOnToThought).toThrow(InterfaceError);

    throwErrorOnToThought = () => reason.think();
    expect(throwErrorOnToThought).toThrow(InterfaceError);

    throwErrorOnVerbalize = () => reason.verbalize();
    expect(throwErrorOnVerbalize).toThrow(InterfaceError);
  });
  it("must assert premises arguments", () => {
    expect(truePremise.conclude()).toEqual(expectedTruePremiseConclusion);
    expect(falsePremise.conclude()).toEqual(expectedFalsePremiseConclusion);

    expect(truePremise.toPremise()).toBe(truePremise);
    expect(falsePremise.toPremise()).toBe(falsePremise);
  });
  it("must assert premises conclusion", () => {
    expect(applyConclusion(premises)).toEqual(expectedPremisesConclusions);
  });
  it("must assert premises verbalization", () => {
    expect(applyVerbalization(premises)).toEqual(expectedPremisesVerbalizations);
  });
  it("must assert disjunction conclusion", () => {
    expect(applyConclusion(disjunctions)).toEqual(expectedDisjunctionsConclusions);
  });
  it("must assert disjunction verbalization", () => {
    expect(applyVerbalization(disjunctions)).toEqual(expectedDisjunctionsVerbalizations);
  });
  it("must assert conjunction conclusion", () => {
    expect(applyConclusion(conjunctions)).toEqual(expectedConjunctionsConclusions);
  });
  it("must assert conjunction verbalization", () => {
    expect(applyVerbalization(conjunctions)).toEqual(expectedConjunctionsVerbalizations);
  });
  it("must assert conjunction verbalization", () => {
    expect(applyPitch(conjunctions)).toEqual(expectedInjConjPitches);
  });
  it("must assert Disjunction/Conjunction corrupted value", () => {
    // Single premise conjunctions
    const injprops = {
      key: `singlePremiseJunction`,
      description: `This is a corrupted single-premise junction`,
      value: new Premise("premise", "This is a premise", true),
    };

    const SinglePremiseDisjunctionThrowError = () => 
      new Disjunction(injprops.key, injprops.description, injprops.value);

    const SinglePremiseConjunctionThrowError = () => 
      new Conjunction(injprops.key, injprops.description, injprops.value);

    expect(SinglePremiseDisjunctionThrowError).toThrow(ReasoningError);
    expect(SinglePremiseConjunctionThrowError).toThrow(ReasoningError);
  });
});


