import { IObserver } from './interfaces'


export class SafeObserver<T> implements IObserver<T> {
  isStopped = false


  constructor(
    private destination: Partial<IObserver<T>>
  ) { }


  next(value: T) {
    if (!this.isStopped && this.destination.next) {
      try {
        this.destination.next(value)
      } catch (err) {
        throw err
      }
    }
  }


  error(err) {
    if (!this.isStopped && this.destination.error) {
      try {
        this.destination.error(err)
        this.complete()
      } catch (err) {
        throw err
      }
    }
  }


  complete() {
    if (!this.isStopped && this.destination.complete) {
      this.isStopped = true
      try {
        this.destination.complete()
      } catch (err) {
        throw err
      }
    }
  }

}
