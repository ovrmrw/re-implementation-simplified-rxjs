import { IObserver, IObservable, ISubscription } from './interfaces'
import { SafeObserver } from './observer'
import { Subscription } from './subscription'


export class Observable<T> implements IObservable<T> {
  isStopped = false


  constructor(
    private _subscribe?: (observer: IObserver<T> | SafeObserver<T>) => ISubscription
  ) { }


  subscribe(observer: Partial<IObserver<T>>): ISubscription {
    const safeObserver = new SafeObserver(observer)
    if (this._subscribe) {
      return this._subscribe(safeObserver)
    } else {
      return new Subscription(safeObserver, this)
    }
  }

}
