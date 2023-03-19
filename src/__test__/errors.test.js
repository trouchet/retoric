import {
  InterfaceError,
  NotImplementedError,
  ReasoningPropertyError,
  UnexpectedReasoningError,
} from "../errors.js";
import { toReasoningCandidate } from "../utils.js";
import { truePremise } from "./fixtures.js";

// Apply callbacks
jest.mock("../sys.js");

describe("errors", () => {
  it("must match defaultArrayTruthMessage on truthError message without truthMessage", () => {
    let message, error;
    message = "Fire!";
    error = new NotImplementedError(message);

    expect(error.message).toMatch(message);
    expect(error.name).toMatch("NotImplementedError");

    message = "";
    error = new NotImplementedError();

    expect(error.name).toMatch("NotImplementedError");
  });
  it("must check interfaceError", () => {
    let message, error;
    message = "This is an interface";
    error = new InterfaceError();

    expect(error.message).toMatch(message);
    expect(error.name).toMatch("InterfaceError");
  });
  it("must check UnexpectedReasoningError", () => {
    let message, error;
    message =
      "We expected a Reasoning candidate i.e. {Reasoning, Premise, Conjunction, Disjunction}.";
    error = new UnexpectedReasoningError();

    expect(error.message).toMatch(message);
    expect(error.name).toMatch("UnexpectedReasoningError");
  });
  it("must check UnexpectedReasoningError", () => {
    let message, error;
    const messageCallback = (name) => `A ${name} on Reasoning must have valid properties`;
    const errorCallback = (candidate, type) => new ReasoningPropertyError(candidate, type);

    message = messageCallback("Reasoning");
    error = errorCallback({}, -1);

    expect(error.message).toMatch(message);
    expect(error.name).toMatch(name);

    message = messageCallback("Premise");
    error = errorCallback({}, 0);

    expect(error.message).toMatch(message);
    expect(error.name).toMatch(name);

    message = messageCallback("Conjunction");
    error = errorCallback({}, 1);

    expect(error.message).toMatch(message);
    expect(error.name).toMatch(name);

    message = messageCallback("Disjunction");
    error = errorCallback({}, 2);

    expect(error.message).toMatch(message);
    expect(error.name).toMatch(name);

    message = messageCallback("Disjunction");
    error = errorCallback(
      toReasoningCandidate("onePremiseDisjunction", "This is a single-premise disjunction", [
        truePremise,
      ]),
      2,
    );

    expect(error.message).toMatch(message);
    expect(error.name).toMatch(name);

    message = messageCallback("Conjunction");
    error = errorCallback(
      toReasoningCandidate("onePremiseConjunction", "This is a single-premise conjunction", [
        truePremise,
      ]),
      1,
    );

    expect(error.message).toMatch(message);
    expect(error.name).toMatch(name);

    message = messageCallback("whatever");
    error = () => errorCallback({}, 3);

    expect(error).toThrow(TypeError);
  });
});
