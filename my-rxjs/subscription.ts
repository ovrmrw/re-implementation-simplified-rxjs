import { IObserver, ISubscription } from './interfaces'
import { Observable } from './observable'


export class Subscription<T> implements ISubscription {
  constructor(
    private observer: Partial<IObserver<T>> | null,
    private source?: Observable<T> | null,
  ) { }


  unsubscribe(): void {
    console.log('unsubscribe is called.')
    if (this.observer && this.observer.complete) {
      this.observer.complete()
      this.observer = null
    }
    if (this.source) {
      this.source = null
    }
  }

}
