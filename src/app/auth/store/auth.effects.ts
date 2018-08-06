import {Actions, Effect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {SET_TOKEN, SIGNUP, TRY_SIGNUP, TrySignup} from './auth.actions';
import {map, mergeMap, switchMap} from 'rxjs/internal/operators';
import {from} from 'rxjs';
import * as firebase from 'firebase';


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

  constructor(private actions$: Actions) {
  }
}
