import { are } from "arqeo";

import {
  isConjunction,
  isConjunctionArtifact,
  isDefined,
  isDisjunctionArtifact,
  isPremiseArtifact,
  isReasoningArtifact,
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
  it("must assert defined variables", () => {
    result = isDefined(42);
    expectation = true;

    expect(result).toEqual(expectation);

    result = isDefined(undefined);
    expectation = false;

    expect(result).toEqual(expectation);
  });
});
