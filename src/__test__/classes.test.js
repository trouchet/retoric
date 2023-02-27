import { InterfaceError } from "../errors";
import { applyReasoningArtifact } from "../utils";
import {
  disjunctions,
  premises,
  truePremise,
  falsePremise,
  expectedTruePremiseArgument,
  expectedFalsePremiseArgument,
  expectedPremisesArguments,
  expectedPremisesConclusions,
  expectedPremisesVerbalizations,
  expectedDisjunctionsConclusions,
  expectedInjConjArguments,
  reason,
  expectedTruePremiseConclusion,
  expectedFalsePremiseConclusion,
  expectedConjunctionsConclusions,
  conjunctions,
  expectedConjunctionsVerbalizations,
  expectedDisjunctionsVerbalizations,
  singlePremiseDisjunction,
  expectedSinglePremiseDisjunctionConclusion,
  expectedSinglePremiseConjunctionConclusion,
  singlePremiseConjunction,
} from "./fixtures";

const argueCallback = (premise) => premise.argue();
const verbalizeCallback = (premise) => premise.verbalize();
const concludeCallback = (premise) => premise.conclude();

describe("classes", () => {
  it("must throw on (toPremise, toArgument, toConclusion, toThought) on Reasoning object", () => {
    let throwErrorOnToPremise,
      throwErrorOnToArgument,
      throwErrorOnToConclusion,
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
    expect(truePremise.argue()).toEqual(expectedTruePremiseArgument);
    expect(falsePremise.argue()).toEqual(expectedFalsePremiseArgument);

    expect(truePremise.conclude()).toEqual(expectedTruePremiseConclusion);
    expect(falsePremise.conclude()).toEqual(expectedFalsePremiseConclusion);

    expect(truePremise.toPremise()).toBe(truePremise);
    expect(falsePremise.toPremise()).toBe(falsePremise);

    expect(applyReasoningArtifact(premises, argueCallback)).toEqual(expectedPremisesArguments);
  });
  it("must assert premises conclusion", () => {
    expect(applyReasoningArtifact(premises, concludeCallback)).toEqual(expectedPremisesConclusions);
  });
  it("must assert premises verbalization", () => {
    expect(applyReasoningArtifact(premises, verbalizeCallback)).toEqual(
      expectedPremisesVerbalizations,
    );
  });
  it("must assert disjunction arguments", () => {
    expect(applyReasoningArtifact(disjunctions, argueCallback)).toEqual(expectedInjConjArguments);
  });
  it("must assert disjunction conclusion", () => {
    expect(applyReasoningArtifact(disjunctions, concludeCallback)).toEqual(
      expectedDisjunctionsConclusions,
    );
  });
  it("must assert disjunction verbalization", () => {
    expect(applyReasoningArtifact(disjunctions, verbalizeCallback)).toEqual(
      expectedDisjunctionsVerbalizations,
    );
  });
  it("must assert disjunction verbalization", () => {
    expect(applyReasoningArtifact(disjunctions, verbalizeCallback)).toEqual(
      expectedDisjunctionsVerbalizations,
    );
  });
  it("must assert single disjunction conclusion", () => {
    expect(applyReasoningArtifact(singlePremiseDisjunction, concludeCallback)).toEqual(
      expectedSinglePremiseDisjunctionConclusion,
    );
  });
  it("must assert conjunction arguments", () => {
    expect(applyReasoningArtifact(conjunctions, argueCallback)).toEqual(expectedInjConjArguments);
  });
  it("must assert conjunction conclusion", () => {
    expect(applyReasoningArtifact(conjunctions, concludeCallback)).toEqual(
      expectedConjunctionsConclusions,
    );
  });
  it("must assert single conjunction conclusion", () => {
    expect(applyReasoningArtifact(singlePremiseConjunction, concludeCallback)).toEqual(
      expectedSinglePremiseConjunctionConclusion,
    );
  });
  it("must assert conjunction verbalization", () => {
    expect(applyReasoningArtifact(conjunctions, verbalizeCallback)).toEqual(
      expectedConjunctionsVerbalizations,
    );
  });
});
