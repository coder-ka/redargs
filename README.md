# redargs

`redargs` is a minimal CLI arguments parser.

## Installation

```bash
npm install redargs
```

## Usage

- `"-"` is default flag name before some flag specified.

```typescript
import { reduceArgs } from 'redargs';

// cli build --dist=dist

const parsed = reduceArgs<{
  operation?: string;
  dist?: string;
}>(
  process.argv.slice(2),
  (parsed, flag) => {
    switch (flag.name) {
      case "-":
        return {
          ...parsed,
          operation: flag.value,
        };
      case "-d": // This is a way to define alias -d for --dist.
      case "--dist":
        return {
          ...parsed,
          dist: flag.value,
        };
      default:
        return parsed;
    }
  },
  {}
);

console.log(parsed);
// Output: { operation: 'build', dist: 'dist' }
```