import { Observable } from './observable';
import { map, take, filter } from './operators';


declare module './observable' {
  interface Observable<T> {
    map: typeof map,
    take: typeof take,
    filter: typeof filter,
  }
}


Observable.prototype.map = map
Observable.prototype.take = take
Observable.prototype.filter = filter
