import * as firebase from 'firebase';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {
  currentUserToken: string;

  constructor(private router: Router){}

  singupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(
        error => console.log(error)
      );
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          this.router.navigate(['/']);
          firebase.auth().currentUser.getIdToken()
            .then((token: string) => this.currentUserToken = token);
        }
      )
      .catch(
        error => console.log(error)
      );
  }

  logout() {
    firebase.auth().signOut();
    this.currentUserToken = null;
  }

  getToken() {
    firebase.auth().currentUser.getIdToken()
      .then((token: string) => this.currentUserToken = token);
    return this.currentUserToken;
  }

  isAuthenticated() {
    return this.currentUserToken != null;
  }
}
