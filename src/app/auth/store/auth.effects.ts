import {Actions, Effect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {LOGOUT, SET_TOKEN, SIGNIN, SIGNUP, TRY_SIGNIN, TRY_SIGNUP, TrySignup} from './auth.actions';
import {map, mergeMap, switchMap, tap} from 'rxjs/internal/operators';
import {from} from 'rxjs';
import * as firebase from 'firebase';
import {Router} from '@angular/router';


@Injectable()
export class AuthEffects {

  @Effect()
  authSignup = this.actions$
    .pipe(
      ofType(TRY_SIGNUP),
      map((action: TrySignup) => action.payload),
      switchMap((authData: { username: string, password: string }) =>
        from(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password))
      ),
      switchMap(() => from(firebase.auth().currentUser.getIdToken())),
      mergeMap((token: string) => [
        {
          type: SIGNUP
        },
        {
          type: SET_TOKEN,
          payload: token
        }
      ])
    );

  @Effect()
  authSignin = this.actions$
    .pipe(
      ofType(TRY_SIGNIN),
      map((action: TrySignup) => action.payload),
      switchMap((authData: { username: string, password: string }) =>
        from(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password))
      ),
      switchMap(() => from(firebase.auth().currentUser.getIdToken())),
      mergeMap((token: string) => {
        this.router.navigate(['/']);
        return [
          {
            type: SIGNIN
          },
          {
            type: SET_TOKEN,
            payload: token
          }
        ];
      })
    );

  @Effect({dispatch: false})
  authLogout = this.actions$
    .pipe(ofType(LOGOUT), tap(() => this.router.navigate(['/'])));

  constructor(private actions$: Actions, private router: Router) {
  }
}
