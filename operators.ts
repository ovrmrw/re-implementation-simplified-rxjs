import { Observable } from './observable'


export function map<T, R>(this: Observable<T>, projection: (value: T) => R): Observable<R> {
  return new Observable<R>((observer) => {
    return this.subscribe({
      next: value => {
        try {
          observer.next(projection(value))
        } catch (err) {
          observer.error(err)
        }
      },
      error: err => observer.error(err),
      complete: () => observer.complete(),
    })
  })
}


export function take<T>(this: Observable<T>, limit: number): Observable<T> {
  let counter = 0
  return new Observable<T>((observer) => {
    return this.subscribe({
      next: value => {
        try {
          if (counter++ < limit) {
            observer.next(value)
          } else {
            observer.complete()
          }
        } catch (err) {
          observer.error(err)
        }
      },
      error: err => observer.error(err),
      complete: () => observer.complete(),
    })
  })
}


export function filter<T>(this: Observable<T>, prediction: (value: T) => boolean): Observable<T> {
  return new Observable<T>((observer) => {
    return this.subscribe({
      next: value => {
        try {
          if (prediction.call(null, value)) {
            observer.next(value)
          }
        } catch (err) {
          observer.error(err)
        }
      },
      error: err => observer.error(err),
      complete: () => observer.complete(),
    })
  })
}
