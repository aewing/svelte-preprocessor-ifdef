# svelte-preprocessor-ifdef

This is a preprocessor for [svelte](https://svelte.dev/) that allows you to conditionally compile code based on the value of a variable.

## Installation

```bash
npm install --save-dev svelte-preprocessor-ifdef
```

## Usage

```js
// svelte.config.js
import ifdefPreprocessor, { IFDEF_DEFAULT_REGEX } from 'svelte-preprocessor-ifdef';
const config = {
  preprocess: ifdefPreprocessor({
    regex: IFDEF_DEFAULT_REGEX, /* (optional) */
    values: ..., /* (default: process.env) */
  }),
};
```

## Examples

```html
<!-- App.svelte -->
<script>
  /* #if DEBUG */
  const DEBUG = true;
  /* #else */
  const DEBUG = false;
  /* #endif */
</script>

{#if DEBUG}
<p>Debug mode</p>
{/if}
```

```bash
DEBUG=true npm run build
```

```html
<!-- App.svelte -->
<script>
  /* #if (SOME_VAR === 'foo') */
  import "side-effect-package";
  /* #endif */
</script>

<p>Some content</p>
```

```bash
SOME_VAR=foo npm run build
```
