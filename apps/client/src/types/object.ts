/** Replace all types from the given object deeply. */
export type DeepReplace<O, T> = {
  [K in keyof O]: O[K][keyof O[K]] extends T
    ? T
    : O[K][keyof O[K]] extends object
    ? DeepReplace<O[K], T>
    : O[K];
};

/** Return a union of all possible paths from the given object into as a array of keys. */
export type ObjectPath<T> = T extends object
  ? {
      [K in keyof T]: [K, ...ObjectPath<T[K]>];
    }[keyof T]
  : [];
