/** @author https://github.com/sindresorhus/type-fest */
export type Join<
  Strings extends Array<string | number>,
  Delimiter extends string
> = Strings extends []
  ? ''
  : Strings extends [string | number]
  ? `${Strings[0]}`
  : Strings extends [string | number, ...infer Rest]
  ? /** @ts-expect-error */
    `${Strings[0]}${Delimiter}${Join<Rest, Delimiter>}`
  : string;
