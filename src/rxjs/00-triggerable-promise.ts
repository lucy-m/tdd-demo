// A promise that can be triggered manually
// for testing purposes
export type TriggerablePromise<T> = {
  promise: Promise<T>;
  resolve: (t: T) => void;
  reject: (error: any) => void;
};

export const makeTriggerablePromise = <T>(): TriggerablePromise<T> => {
  let resolve: (t: T) => void;
  let reject: (error: any) => void;

  const promise = new Promise<T>((rs, rj) => {
    resolve = rs;
    reject = rj;
  });

  return { promise, resolve: resolve!, reject: reject! };
};
