import { IObserver, ISubscription } from './interfaces'


export class Subscription<T> implements ISubscription {
  constructor(
    private observer: Partial<IObserver<T>>,
  ) { }


  unsubscribe() {
    console.log('unsubscribe is called.')
    if (this.observer.complete) {
      this.observer.complete()
    }
  }

}
