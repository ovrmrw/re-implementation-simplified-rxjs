import { IObserver } from './interfaces'


export class SafeObserver<T> implements IObserver<T> {
  constructor(
    private observer: Partial<IObserver<T>>
  ) { }


  next(value: T) {
    if (this.observer.next) {
      try {
        this.observer.next(value)
      } catch (err) {
        throw err
      }
    }
  }


  error(err) {
    if (this.observer.error) {
      try {
        this.observer.error(err)
        this.complete()
      } catch (err) {
        throw err
      }
    }
  }


  complete() {
    if (this.observer.complete) {
      try {
        this.observer.complete()
      } catch (err) {
        throw err
      }
    }
  }

}
