import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AppState} from '../../store/app.reducers';
import {Store} from '@ngrx/store';
import {TrySignin} from '../store/auth.actions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
  }

  onSignin(form: NgForm) {
    const {value: {email, password}} = form;
    this.store.dispatch(new TrySignin({username: email, password}));
  }
}
