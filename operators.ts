import { Observable } from './observable'


export function map<T, R>(this: Observable<T>, projection: (value: T) => R): Observable<R> {
  return new Observable<R>((observer) => {
    return this.subscribe({
      next: value => {
        console.log('map operator:', 'next')
        try {
          observer.next(projection(value))
        } catch (err) {
          observer.error(err)
        }
      },
      error: err => observer.error(err),
      complete: () => {
        console.log('map operator:', 'complete')
        observer.complete()
      },
      name: 'map operator'
    })
  })
}


export function take<T>(this: Observable<T>, limit: number): Observable<T> {
  let counter = 0
  return new Observable<T>((observer) => {
    return this.subscribe({
      next: value => {
        console.log('take operator:', 'next')
        try {
          if (counter++ < limit) {
            observer.next(value)
          } else {
            console.log('take operator:', 'complete in next')
            observer.complete()
          }
        } catch (err) {
          observer.error(err)
        }
      },
      error: err => observer.error(err),
      complete: () => {
        console.log('take operator:', 'complete')
        observer.complete()
      },
      name: 'take operator'
    })
  })
}


export function filter<T>(this: Observable<T>, prediction: (value: T) => boolean): Observable<T> {
  return new Observable<T>((observer) => {
    return this.subscribe(
      value => { // next
        console.log('filter operator:', 'next')
        try {
          if (prediction.call(null, value)) {
            observer.next(value)
          }
        } catch (err) {
          observer.error(err)
        }
      },
      err => observer.error(err), // error
      () => { // complete
        console.log('filter operator:', 'complete')
        observer.complete()
      },
      'filter operator' // name
    )
  })
}
