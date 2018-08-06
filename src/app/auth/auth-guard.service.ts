import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app.reducers';
import {State} from './store/auth.reducers';
import {map} from 'rxjs/internal/operators';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private store: Store<AppState>) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select('auth')
      .pipe(map((authState: State) => {
        return authState.authenticated;
      }));
  }
}
