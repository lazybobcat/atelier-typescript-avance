export type Prettify<T> = {
  [K in keyof T]: T[K];
};

export type StartsWith<
  TString extends string,
  TStart extends string,
> = TString extends `${TStart}${string}` ? TString : never;

export type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <
  T,
>() => T extends Y ? 1 : 2
  ? true
  : false;

export type Expect<T extends true> = T;
