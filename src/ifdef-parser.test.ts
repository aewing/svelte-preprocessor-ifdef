import { describe, it, expect } from "vitest";
import parse, { IFDEF_DEFAULT_REGEX } from "./ifdef-parser";

const testSimple = /* ts */ `
/* #ifdef TEST */ 
const test = true
/* #endif */
`;

const testElse = /* ts */ `
/* #ifdef TEST */
  const test = true
/* #else */
  const test = false
/* #endif */
`;

const testIfParenthesis = /* ts */ `
/* #ifdef (TEST === true) */
  const test = true
/* #else */
  const test = false
/* #endif */
`;

const testImportLogic = /* ts */ `
  /* #ifdef FOO === 'bar' && BAR !== 'foo' */
  import 'test';
  /* #endif */
`;

describe("ifdef-parser", () => {
  it("should include code if a condition is truthy", async () => {
    const result = await parse(testSimple, {
      regex: IFDEF_DEFAULT_REGEX,
      values: { TEST: true },
    });
    expect(result).toBe(`const test = true`);
  });

  it("should exclude code if a condition is falsy", async () => {
    const result = await parse(testSimple, {
      regex: IFDEF_DEFAULT_REGEX,
      values: { TEST: false },
    });
    expect(result).toBe(``);
  });

  it("should include else code if a condition is truthy", async () => {
    const result = await parse(testElse, {
      regex: IFDEF_DEFAULT_REGEX,
      values: { TEST: true },
    });
    expect(result).toBe(`const test = true`);
  });

  it("should exclude else code if a condition is falsy", async () => {
    const result = await parse(testElse, {
      regex: IFDEF_DEFAULT_REGEX,
      values: { TEST: false },
    });
    expect(result).toBe(`const test = false`);
  });

  it("should include code if a condition is truthy with parenthesis", async () => {
    const result = await parse(testIfParenthesis, {
      regex: IFDEF_DEFAULT_REGEX,
      values: { TEST: true },
    });
    expect(result).toBe(`const test = true`);
  });

  it("should exclude code if a condition is falsy with parenthesis", async () => {
    const result = await parse(testIfParenthesis, {
      regex: IFDEF_DEFAULT_REGEX,
      values: { TEST: false },
    });
    expect(result).toBe(`const test = false`);
  });

  it("should work with chained conditions", async () => {
    const result = await parse(testImportLogic, {
      regex: IFDEF_DEFAULT_REGEX,
      values: { FOO: "bar", BAR: "baz" },
    });
    expect(result).toBe(`import 'test';`);

    const resultB = await parse(testImportLogic, {
      regex: IFDEF_DEFAULT_REGEX,
      values: { FOO: "bar", BAR: "foo" },
    });
    expect(resultB).toBe(``);
  });
});
