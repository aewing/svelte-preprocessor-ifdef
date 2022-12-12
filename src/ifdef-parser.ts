import ejs from "ejs";
import type { IfDefPreprocessorOptions } from "./types";

export const IFDEF_DEFAULT_REGEX =
  /\/\* #ifdef \(?([^)*]+)\)? \*\/\s+([.*|\S|\s]*?)\s+\/\* #endif \*\//gm;
export async function parseIfDef(
  code: string,
  options: IfDefPreprocessorOptions = {
    regex: IFDEF_DEFAULT_REGEX,
    values: process.env,
  }
): Promise<string> {
  // match /* #if (condition) */ ... /* #endif */
  const parsed = code.replace(
    options.regex || IFDEF_DEFAULT_REGEX,
    (match, condition, content) => {
      // handle else
      const [ifContent, elseContent] = content.split("/* #else */");
      const result = ejs.render(
        `<% if (${condition}) { %>${ifContent || ""}<% } else { %>${
          elseContent || ""
        }<% } %>`,
        options.values
      );

      return result;
    }
  );
  return (
    parsed
      ?.trim()
      .split("\n")
      .filter((l) => l.length)
      .join("\n") || ""
  );
}
export default parseIfDef;
