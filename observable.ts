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
    complete?: () => void,
    name?: string,
  ): UnsubscribeCallback {

    console.log('Run subscribe:', (observerOrNext.name || name) + ':', 'in Observable')

    let observer: Partial<IObserver<T>> = observerOrNext
    if (observerOrNext instanceof Function) {
      observer = {
        next: observerOrNext,
        error,
        complete,
        name,
      }
    }

    const safeObserver = new SafeObserver(observer)
    safeObserver.unsub = this._subscribe(safeObserver) // このときObservableチェーンの上位のsubscribeが実行される。
    return safeObserver.unsubscribe.bind(safeObserver)
  }

}
