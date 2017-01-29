import { map, filter } from './operators'
import { Observable } from './observable'


Observable.prototype.map = map
Observable.prototype.filter = filter


declare module './observable' {
  interface Observable<T> {
    map: typeof map,
    filter: typeof filter,
  }
}
