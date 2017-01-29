import { IObserver } from './interfaces'


export class SafeObserver<T> implements IObserver<T> {
  constructor(
    private destination: Partial<IObserver<T>>
  ) { }


  next(value: T) {
    if (this.destination.next) {
      try {
        this.destination.next(value)
      } catch (err) {
        throw err
      }
    }
  }


  error(err) {
    if (this.destination.error) {
      try {
        this.destination.error(err)
        this.complete()
      } catch (err) {
        throw err
      }
    }
  }


  complete() {
    if (this.destination.complete) {
      try {
        this.destination.complete()
      } catch (err) {
        throw err
      }
    }
  }

}
