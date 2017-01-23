export interface IObserver<T> {
  next: (value: T) => void,
  error: (error: any) => void,
  complete: () => void,
  name: string,
}


export interface ISubscription {
  unsubscribe: UnsubscribeCallback
}


export interface ISubscribable<T> {
  subscribe: (
    observerOrNext: Partial<IObserver<T>> | ((value: T) => void),
    error?: (error: any) => void,
    complete?: () => void,
    name?: string,
  ) => UnsubscribeCallback
}


export type UnsubscribeCallback = () => void
