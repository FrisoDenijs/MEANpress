import { Component, OnInit } from '@angular/core';
import { LoginForm } from './login.form';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private loginForm: LoginForm;

  constructor() {
  }

  ngOnInit() {
    this.loginForm = new LoginForm();
  }

}
