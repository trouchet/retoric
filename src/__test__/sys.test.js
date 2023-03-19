import { warn, raise, report, joke, debug } from "../sys.js";
import { log } from "../logger.js";

jest.mock("../logger.js");

describe("warn/raise/report/joke", () => {
  it("should throw error", () => expect(() => raise(Error("Fire!"))).toThrowError(Error));

  it("should throw TypeError", () => {
    expect(() => raise(new TypeError("Wrong is not right!")).toThrowError(TypeError));
  });

  it("should call log on report", () => {
    report("News!");
    expect(log).toHaveBeenCalled();
  });

  it("should call debug on report", () => {
    debug(":-)");
    expect(log).toHaveBeenCalled();
  });

  it("should call log on joke", () => {
    joke("News!");
    expect(log).toHaveBeenCalled();
  });

  it("should warn a message", () => {
    warn("It is warm.");
    expect(log).toHaveBeenCalled();
  });
});
