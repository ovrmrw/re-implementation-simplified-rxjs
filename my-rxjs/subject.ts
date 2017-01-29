import { Observable } from './observable'
import { SafeObserver } from './observer'
import { Subscription } from './subscription'
import { IObservable, IObserver, ISubscription } from './interfaces'


export class Subject<T> extends Observable<T> implements IObserver<T> {
  observers: IObserver<T>[] = []


  subscribe(observer: Partial<IObserver<T>>): ISubscription {
    const safeObserver = new SafeObserver(observer)
    this.observers.push(safeObserver)
    return new Subscription(observer, this)
  }


  next(value: T) {
    if (!this.isStopped) {
      this.observers.forEach(observer => observer.next(value))
    }
  }


  error(err) {
    if (!this.isStopped) {
      this.observers.forEach(observer => observer.error(err))
    }
  }


  complete() {
    if (!this.isStopped) {
      this.isStopped = true
      this.observers.forEach(observer => observer.complete())
    }
  }

}
