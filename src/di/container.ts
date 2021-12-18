/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable new-cap */
/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/ban-types */
interface IContainerProvider {
  token: string;
  useClass: Function;
}

export class Container {
  private static instance: Container;

  readonly providers: { [key: string]: any } = {};

  static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }

    return Container.instance;
  }

  resolve<T>(targetClass: any): T {
    const hasDependencies = Reflect.getMetadata('injectionToken', targetClass);
    const tokens = (hasDependencies && Object.values(hasDependencies)) || [];

    const injections = tokens.map((token: string) => {
      const provider = this.providers[token];

      if (provider.prototype) return container.resolve(provider);

      return provider;
    });

    this.providers[targetClass.name] = new targetClass(...injections);

    return this.providers[targetClass.name];
  }

  register({ token, useClass }: IContainerProvider) {
    this.providers[token] = useClass;
  }
}

export const container = Container.getInstance();
