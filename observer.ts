import { IObserver, ISubscription } from './interfaces';


export class SafeObserver<T> implements IObserver<T>, ISubscription {
  isUnsubscribed = false

  unsub: () => void


  constructor(
    private destination: Partial<IObserver<T>>
  ) { }


  next(value: T): void {
    if (!this.isUnsubscribed && this.destination.next) {
      try {
        this.destination.next(value)
      } catch (err) {
        this.unsubscribe()
        throw err
      }
    }
  }


  error(err: any): void {
    if (!this.isUnsubscribed && this.destination.error) {
      try {
        this.destination.error(err)
      } catch (err2) {
        this.unsubscribe()
        throw err2
      }
      this.unsubscribe()
    }
  }


  complete(): void {
    if (!this.isUnsubscribed && this.destination.complete) {
      try {
        this.destination.complete()
      } catch (err) {
        this.unsubscribe()
        throw err
      }
      this.unsubscribe()
    }
  }


  unsubscribe(): void {
    this.isUnsubscribed = true
    if (this.unsub) {
      this.unsub()
    }
  }

}