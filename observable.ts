import { IObserver, ISubscribable, UnsubscribeCallback } from './interfaces'
import { SafeObserver } from './observer'


export class Observable<T> implements ISubscribable<T> {
  private _subscribe: (observer: IObserver<T>) => UnsubscribeCallback


  constructor(subscribe?: (observer: IObserver<T>) => UnsubscribeCallback) {
    if (subscribe) {
      this._subscribe = subscribe
    }
  }


  subscribe(this: Observable<T>,
    observerOrNext: Partial<IObserver<T>> | ((value: T) => void),
    error?: (error: any) => void,
    complete?: () => void
  ): UnsubscribeCallback {

    let observer: Partial<IObserver<T>> = observerOrNext
    if (observerOrNext instanceof Function) {
      observer = { next: observerOrNext }
      if (error) {
        observer = Object.assign(observer, { error })
      }
      if (complete) {
        observer = Object.assign(observer, { complete })
      }
    }

    const safeObserver = new SafeObserver(observer)
    safeObserver.unsub = this._subscribe(safeObserver)
    return safeObserver.unsubscribe.bind(safeObserver)
  }

}
