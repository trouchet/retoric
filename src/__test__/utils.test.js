import { isNumber } from "lodash";
import { isReasoningArtifact } from "../checkers.js";
import { OperationError } from "../errors.js";
import {
  applyReasoningArtifact,
  getPremiseKeys,
  getPremisesEntries,
  and,
  batchAnd,
  andify,
  or,
  batchOr,
  orify,
  delimitify,
  slugify,
  stringifier,
  batchOperation,
  hyphenify,
  enumerate,
} from "../utils.js";
import {
  expectedPremisesEntries,
  expectedPremisesKeys,
  premises,
  expectedPremisesConclusions,
} from "./fixtures.js";

const concludeCallback = (premise) => premise.conclude();

let result, expectation;

describe("utils", () => {
  it("must assert reasoning artifact", () => {
    expect(isReasoningArtifact(premises)).toEqual(true);
  });
  it("must assert getPremisesEntries", () => {
    result = getPremisesEntries(premises);
    expectation = expectedPremisesEntries;

    expect(result).toEqual(expectation);
  });
  it("must assert getPremisesKeys", () => {
    result = getPremiseKeys(premises);
    expectation = expectedPremisesKeys;

    expect(result).toEqual(expectation);
  });
  it("must assert applyReasoningArtifact", () => {
    result = applyReasoningArtifact(premises, concludeCallback);
    expectation = expectedPremisesConclusions;

    expect(result).toEqual(expectation);
  });
  it("must throw on non-fulfillinf condition for applyReasoningArtifact", () => {
    result = () => applyReasoningArtifact(["ackbar", 42], concludeCallback);
    expectation = TypeError;

    expect(result).toThrow(expectation);
  });
  it("assert batch operation", () => {
    result = batchOperation([1, 2, 3], (a, b) => a + b, 0, isNumber);
    expectation = 6;

    expect(result).toEqual(expectation);

    result = () => batchOperation([1, 2, "3"], (a, b) => a + b, 0, isNumber);
    expectation = OperationError;

    expect(result).toThrow(expectation);

    result = () => batchOperation([1], (a, b) => a + b, 0, isNumber);
    expectation = OperationError;

    expect(result).toThrow(expectation);
  });
  it('assert batch operators "and" and "or"', () => {
    result = and(true, true);
    expect(result).toEqual(true);

    result = and(true, false);
    expect(result).toEqual(false);

    result = and(false, true);
    expect(result).toEqual(false);

    result = and(false, false);
    expect(result).toEqual(false);

    result = batchAnd([true, true]);
    expect(result).toEqual(true);

    result = batchAnd([true, false]);
    expect(result).toEqual(false);

    result = () => batchAnd([true, 42]);
    expect(result).toThrow(TypeError);

    result = () => batchAnd(true);
    expectation = OperationError;

    expect(result).toThrow(expectation);

    result = or(true, true);
    expect(result).toEqual(true);

    result = or(true, false);
    expect(result).toEqual(true);

    result = or(false, true);
    expect(result).toEqual(true);

    result = or(false, false);
    expect(result).toEqual(false);

    result = batchOr([false, false]);
    expect(result).toEqual(false);

    result = batchOr([true, false]);
    expect(result).toEqual(true);

    result = () => batchOr([true, 42]);
    expectation = OperationError;

    expect(result).toThrow(expectation);

    result = () => batchOr(true);
    expectation = OperationError;

    expect(result).toThrow(expectation);
  });
});

const numberList = [1, 2, 3];

describe("delimitify", () => {
  it("must return string delimited by plus +", () => {
    const result = delimitify(numberList, "+");

    expect(result).toBe("1+2+3");
  });
  it("must return string delimited by underscore _", () => {
    const result = slugify(numberList);

    expect(result).toBe("1_2_3");
  });
  it("must return string delimited by underscore _", () => {
    const result = hyphenify(numberList);

    expect(result).toBe("1-2-3");
  });
  it("must return string delimited by pipe |", () => {
    const result = orify(numberList);

    expect(result).toBe("1|2|3");
  });
  it("must return string delimited by and &", () => {
    const result = andify(numberList);

    expect(result).toBe("1&2&3");
  });
  it("should return equal stringified element", () => {
    result = stringifier(1);

    expect(result).toEqual("1");
  });
  it("should return equal stringified array elements", () => {
    result = stringifier(numberList);

    expect(result).toEqual(["1", "2", "3"]);
  });
  it("should return equal stringified array elements", () => {
    expectation = "0. 1\n1. 2\n2. 3";
    result = enumerate(["1", "2", "3"]);

    expect(result).toMatch(expectation);
  });
});
