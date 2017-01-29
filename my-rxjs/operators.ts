import { IObserver } from './interfaces'
import { Observable } from './observable'


export function map<T, R>(this: Observable<T>, projection: (value: T) => R): Observable<R> {
  return new Observable<R>(observer => {
    return this.subscribe({
      next: value => observer.next(projection(value)),
      error: err => observer.error(err),
      complete: () => observer.complete(),
    })
  })
}


export function filter<T>(this: Observable<T>, prediction: (value: T) => boolean): Observable<T> {
  return new Observable<T>(observer => {
    return this.subscribe({
      next: value => prediction(value) ? observer.next(value) : void 0,
      error: err => observer.error(err),
      complete: () => observer.complete(),
    })
  })
}
