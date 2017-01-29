import 'core-js'

import { DataSource } from './datasource'
import { Observable, Subscription } from './my-rxjs'
import './my-rxjs/add-operators'


const observable = new Observable<number>((observer) => {
  const ds = new DataSource()
  ds.onnext = (value) => observer.next(value)
  ds.oncomplete = () => observer.complete()
  return new Subscription({
    complete: () => ds.destroy()
  })
})


const subscription =
  observable
    .map(value => value * 2)
    .filter(value => value > 10)
    .subscribe({
      next: (value) => console.log(value),
      complete: () => console.log('complete!')
    })


setTimeout(() => {
  subscription.unsubscribe()
}, 1000)
