import { IObserver, IObservable, ISubscription } from './interfaces'
import { SafeObserver } from './observer'


export class Observable<T> implements IObservable<T> {
  constructor(
    private _subscribe: (observer: IObserver<T> | SafeObserver<T>) => ISubscription
  ) { }


  subscribe(observer: Partial<IObserver<T>>): ISubscription {
    const safeObserver = new SafeObserver(observer)
    return this._subscribe(safeObserver)
  }

}
