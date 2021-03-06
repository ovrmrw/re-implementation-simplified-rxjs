import 'core-js'

import { DataSource } from './datasource'
import { Observable, Subscription, Subject } from './my-rxjs'
import './my-rxjs/add-operators'


const observable = new Observable<number>(observer => {
  const ds = new DataSource()
  ds.onnext = value => observer.next(value)
  ds.oncomplete = () => observer.complete()
  return new Subscription({
    complete: () => ds.destroy()
  })
})


const subscription1 =
  observable
    .map(value => value * 2)
    .filter(value => value > 10)
    .subscribe({
      next: value => console.log(value),
      complete: () => console.log('observable complete!')
    })



const subject = new Subject<number>()

const subscription2 =
  subject
    .map(value => value * 100)
    .subscribe({
      next: value => console.log(value),
      complete: () => console.log('subject1 complete!')
    })

const subscription3 =
  subject
    .map(value => value * 1000)
    .subscribe({
      next: value => console.log(value),
      complete: () => console.log('subject2 complete!')
    })

subject.next(1)
subject.next(2)
subject.next(3)



setTimeout(() => {
  subscription1.unsubscribe()
  subscription2.unsubscribe()

  subject.next(4)
  subscription3.unsubscribe()
  subject.next(5)
}, 1000)
