import { IObserver, ISubscription } from './interfaces'


export class SafeObserver<T> implements IObserver<T>, ISubscription {
  isUnsubscribed = false

  unsub: () => void


  constructor(
    private destination: Partial<IObserver<T>>
  ) { }


  name = this.destination.name ? this.destination.name : 'no name'


  next(value: T): void {
    if (!this.isUnsubscribed && this.destination.next) {
      try {
        console.log('Run next:', this.destination.name + ':', 'in SafeObserver')
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
        console.log('Run error:', this.destination.name + ':', 'in SafeObserver')
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
        console.log('Run complete:', this.destination.name + ':', 'in SafeObserver')
        this.destination.complete()
      } catch (err) {
        this.unsubscribe()
        throw err
      }
      this.unsubscribe()
    }
  }





  unsubscribe(): void {
    console.log('Run unsubscribe:', this.destination.name + ':', 'in SafeObserver')
    this.isUnsubscribed = true
    if (this.unsub) {
      this.unsub()
    }
  }

}