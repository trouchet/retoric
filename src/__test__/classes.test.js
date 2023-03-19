import { Conjunction_, Disjunction_, Premise_, Reasoning } from "../classes";
import { InterfaceError, ReasoningError, ReasoningPropertyError } from "../errors";
import { applyArguing, applyConclusion, applyPitch, applyVerbalization } from "../utils";
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
  expectedConjunctionPitches,
  expectedDisjunctionsPitches,
  expectedJunctionsArguments,
} from "./fixtures";

// Apply callbacks
jest.mock("../logger.js");

describe("classes", () => {
  it("must throw on (toPremise, toConclusion, toThought) on Reasoning object", () => {
    let throwErrorOnReasoningConstructor,
      throwErrorOnToPremise,
      throwErrorOnToConclusion,
      throwErrorOnToArgument,
      throwErrorOnToThought,
      throwErrorOnVerbalize;

    throwErrorOnReasoningConstructor = () => new Reasoning(42, 42, 42);
    expect(throwErrorOnReasoningConstructor).toThrow(ReasoningPropertyError);

    throwErrorOnReasoningConstructor = () => new Premise_(42, 42, 42);
    expect(throwErrorOnReasoningConstructor).toThrow(ReasoningPropertyError);

    throwErrorOnReasoningConstructor = () => new Disjunction_(42, 42, 42);
    expect(throwErrorOnReasoningConstructor).toThrow(ReasoningPropertyError);

    throwErrorOnReasoningConstructor = () => new Conjunction_(42, 42, 42);
    expect(throwErrorOnReasoningConstructor).toThrow(ReasoningPropertyError);

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
  it("must assert conjunction pitch", () => {
    expect(applyPitch(conjunctions)).toEqual(expectedConjunctionPitches);
  });
  it("must assert disjunction pitch", () => {
    expect(applyPitch(disjunctions)).toEqual(expectedDisjunctionsPitches);
  });
  it("must assert {conjunctions,disjunctions} pitch", () => {
    expect(applyArguing(disjunctions)).toEqual(expectedJunctionsArguments);
    expect(applyArguing(conjunctions)).toEqual(expectedJunctionsArguments);
  });
  it("must assert Disjunction/Conjunction corrupted value", () => {
    // Single premise conjunctions
    const injprops = {
      key: `singlePremiseJunction`,
      description: `This is a corrupted single-premise junction`,
      value: new Premise_("premise", "This is a premise", true),
    };

    const SinglePremiseDisjunctionThrowError = () =>
      new Disjunction_(injprops.key, injprops.description, injprops.value);

    const SinglePremiseConjunctionThrowError = () =>
      new Conjunction_(injprops.key, injprops.description, injprops.value);

    expect(SinglePremiseDisjunctionThrowError).toThrow(ReasoningError);
    expect(SinglePremiseConjunctionThrowError).toThrow(ReasoningError);
  });
});
