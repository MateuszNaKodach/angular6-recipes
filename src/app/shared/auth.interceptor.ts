import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AppState} from '../store/app.reducers';
import {Store} from '@ngrx/store';
import {map, switchMap, take} from 'rxjs/internal/operators';
import {State} from '../auth/store/auth.reducers';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private store: Store<AppState>) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercepted!');
    return this.store.select('auth')
      .pipe(take(1), switchMap((authState: State) => {
        const copiedRequest = req.clone({params: req.params.set('auth', authState.token)});
        return next.handle(copiedRequest);
      }));
  }
}
