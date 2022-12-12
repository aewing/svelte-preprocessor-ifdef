import parseIfDef, { IFDEF_DEFAULT_REGEX } from "./ifdef-parser";
import type { IfDefPreprocessorOptions, SveltePreprocessor } from "./types";

export function ifdefPreprocessor(
  options: IfDefPreprocessorOptions = {
    regex: IFDEF_DEFAULT_REGEX,
    values: process.env,
  }
) {
  return {
    markup: async ({ content }) => {
      return {
        code: await parseIfDef(content, options),
      };
    },
    script: async ({ content }) => {
      return {
        code: await parseIfDef(content, options),
      };
    },
    style: async ({ content }) => {
      return {
        code: await parseIfDef(content, options),
      };
    },
  } as SveltePreprocessor;
}
