import { is, are } from "arqeo";

import {
  isConjunction,
  isConjunctionArtifact,
  isDefined,
  isDisjunction,
  isDisjunctionArtifact,
  isPremise,
  isPremiseArtifact,
  isReasoningArtifact,
} from "../checkers";
import { conjunctions, injunctions, premiseArtifacts, premises } from "./fixtures";

let result, expectation;

describe("checkers", () => {
  it("must check true for premises", () => {
    expect(is(premises, isPremise)).toEqual(true);
    expect(are(premiseArtifacts, isPremise)).toEqual(true);
  });
  it("must check true for injunctions", () => {
    expect(are(injunctions, isDisjunction)).toEqual(true);
  });
  it("must check true for conjunctions", () => {
    expect(are(conjunctions, isConjunction)).toEqual(true);
  });
  it("must assert is{Premise|Conjunction|Disjunction}Artifact", () => {
    expect(isReasoningArtifact(premises)).toEqual(true);

    expect(isPremiseArtifact(premises)).toEqual(true);
    expect(isDisjunctionArtifact(injunctions)).toEqual(true);
    expect(isConjunctionArtifact(conjunctions)).toEqual(true);

    expect(isPremiseArtifact(conjunctions)).toEqual(false);
    expect(isDisjunctionArtifact(premises)).toEqual(false);
    expect(isConjunctionArtifact(injunctions)).toEqual(false);
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
