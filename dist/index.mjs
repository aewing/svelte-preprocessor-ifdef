// src/ifdef-parser.ts
import ejs from "ejs";
var IFDEF_DEFAULT_REGEX = /\/\* #ifdef \(?([^)*]+)\)? \*\/\s+([.*|\S|\s]*?)\s+\/\* #endif \*\//gm;
async function parseIfDef(code, options = {
  regex: IFDEF_DEFAULT_REGEX,
  values: process.env
}) {
  const parsed = code.replace(
    options.regex || IFDEF_DEFAULT_REGEX,
    (match, condition, content) => {
      const [ifContent, elseContent] = content.split("/* #else */");
      const result = ejs.render(
        `<% if (${condition}) { %>${ifContent || ""}<% } else { %>${elseContent || ""}<% } %>`,
        options.values
      );
      return result;
    }
  );
  return (parsed == null ? void 0 : parsed.trim().split("\n").filter((l) => l.length).join("\n")) || "";
}
var ifdef_parser_default = parseIfDef;

// src/preprocessor.ts
function ifdefPreprocessor(options = { regex: IFDEF_DEFAULT_REGEX }) {
  return {
    markup: async ({ content }) => {
      return {
        code: await ifdef_parser_default(content, options)
      };
    },
    script: async ({ content }) => {
      return {
        code: await ifdef_parser_default(content, options)
      };
    },
    style: async ({ content }) => {
      return {
        code: await ifdef_parser_default(content, options)
      };
    }
  };
}
export {
  IFDEF_DEFAULT_REGEX,
  ifdefPreprocessor,
  parseIfDef
};
//# sourceMappingURL=index.mjs.map