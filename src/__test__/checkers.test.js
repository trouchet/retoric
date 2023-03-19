import { are } from "arqeo";

import {
  isConjunction,
  isConjunctionArtifact,
  isConjunctionProperty,
  isDefined,
  isDisjunctionArtifact,
  isDisjunctionProperty,
  isPremiseArtifact,
  isPremiseProperty,
  isReasoningArtifact,
  reasoningType,
} from "../checkers";
import { premises, conjunctions, disjunctions } from "./fixtures";

let result, expectation;

describe("checkers", () => {
  it("must check true for conjunctions", () => {
    expect(are(conjunctions, isConjunction)).toEqual(true);
  });
  it("must assert is{Premise|Conjunction|Disjunction}Artifact", () => {
    expect(isReasoningArtifact(premises)).toEqual(true);

    expect(isPremiseArtifact(premises)).toEqual(true);
    expect(isDisjunctionArtifact(disjunctions)).toEqual(true);
    expect(isConjunctionArtifact(conjunctions)).toEqual(true);

    expect(isPremiseArtifact(conjunctions)).toEqual(false);
    expect(isDisjunctionArtifact(premises)).toEqual(false);
    expect(isConjunctionArtifact(disjunctions)).toEqual(false);
  });
  it("must assert is{Premise|Conjunction|Disjunction}Property", () => {
    expect(isPremiseProperty(42)).toEqual(false);
    expect(isConjunctionProperty(42)).toEqual(false);
    expect(isDisjunctionProperty(42)).toEqual(false);
  });
  it("must assert reasoning type", () => {
    expect(reasoningType(premises[0])).toEqual("Premise");
    expect(reasoningType(disjunctions[0])).toEqual("Disjunction");
    expect(reasoningType(conjunctions[0])).toEqual("Conjunction");

    const reasoningTypeThrow = () => reasoningType({});

    expect(reasoningTypeThrow).toThrow();
  });
  it("must assert defined variables", () => {
    result = isDefined(42);
    expectation = true;

    expect(result).toEqual(expectation);

    result = isDefined(undefined);
    expectation = false;

    expect(result).toEqual(expectation);
  });
});
