export function reduceArgs<T>(
  args: string[],
  fn: (parsed: T, flag: { name: string; value: string }) => T,
  defaultValue: T
): T {
  const tokens = args.flatMap((x) => x.split("="));

  const { parsed } = tokens.reduce(
    ({ parsed, flag }, token) => {
      if (token.startsWith("--") || token.startsWith("-")) {
        return {
          parsed,
          flag: token,
        };
      } else {
        return {
          flag,
          parsed: fn(parsed, { name: flag, value: token }),
        };
      }
    },
    {
      parsed: defaultValue,
      flag: "-",
    }
  );

  return parsed;
}
