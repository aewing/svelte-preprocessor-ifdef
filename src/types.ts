export type IfDefPreprocessorOptions = {
  regex: RegExp;
  values: Record<string, unknown>;
};

export type SveltePreprocessor = {
  markup?: (input: { content: string; filename: string }) => Promise<{
    code: string;
    dependencies?: Array<string>;
  }>;
  script?: (input: {
    content: string;
    markup: string;
    attributes: Record<string, string>;
    filename: string;
  }) => Promise<{
    code: string;
    dependencies?: Array<string>;
  }>;
  style?: (input: {
    content: string;
    markup: string;
    attributes: Record<string, string>;
    filename: string;
  }) => Promise<{
    code: string;
    dependencies?: Array<string>;
  }>;
};
