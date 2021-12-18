/* eslint-disable @typescript-eslint/ban-types */
export function inject(token: string) {
  return (target: Object, name: string, index: number) => {
    const descriptors = Reflect.getMetadata('injectionTokens', target) || {};

    descriptors[index] = token;
    Reflect.defineMetadata('injectionToken', descriptors, target);
  };
}
