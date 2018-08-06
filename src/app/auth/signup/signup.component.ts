import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.reducers';
import {TrySignup} from '../store/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
  }

  onSignup(form: NgForm) {
    const formValues = form.value;
    const {email, password} = formValues;
    this.store.dispatch(new TrySignup({username: email, password}));
  }

}
