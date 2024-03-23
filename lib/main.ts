export function reduceArgs<T>(
  args: string[],
  fn: (parsed: T, flag: { name: string; values: string[] }) => T,
  defaultValue: T
): T {
  const tokens = ["-"].concat(args.flatMap((x) => x.split("=")));

  let parsed = defaultValue;

  for (let i = 0, imax = tokens.length; i < imax; i++) {
    const token = tokens[i];

    if (isFlag(token)) {
      const name = token;

      const values = [] as string[];

      while (true) {
        i++;
        const token = tokens[i];
        if (isFlag(token)) {
          break;
        } else {
          values.push(token);
        }
      }

      parsed = fn(parsed, { name, values });
    }
  }

  return parsed;
}

function isFlag(token: string) {
  return token.startsWith("--") || token.startsWith("-");
}
