export interface IObservable<T> {
  subscribe: (observer: Partial<IObserver<T>>) => ISubscription
}


export interface IObserver<T> {
  next: (value: T) => void,
  error: (error: any) => void,
  complete: () => void,
}


export interface ISubscription {
  unsubscribe: () => void,
}
