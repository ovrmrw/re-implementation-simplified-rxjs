import './add-operators'
import { Observable } from './observable'
import { DataSource } from './datasource'


const myObservable = new Observable<number>((observer) => {
  const datasource = new DataSource()
  datasource.ondata = (e) => observer.next(e)
  datasource.oncomplete = () => observer.complete()
  return () => datasource.destroy() // run when unsubscribe is called.
})


const unsubscribe = myObservable
  .map(value => value + value)
  .filter(value => value > 5)
  .map(value => value + '!')
  .take(5)
  .subscribe({
    next: value => console.log(value),
    error: err => { },
    complete: () => console.log('complete')
  })


// setTimeout(() => {
//   unsubscribe()
// }, 2000)
