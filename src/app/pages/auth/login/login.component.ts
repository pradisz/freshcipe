import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../@core/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-login',
  templateUrl: 'login.component.html',
  styleUrls: ['../auth.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error: string;
  constructor(
    private titleService: Title,
    public auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.titleService.setTitle('Login | Freshcipe');
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  facebookSignin() {
    this.auth
      .facebookSignin()
      .then(_ => {
        this.router.navigate([this.returnUrl]);
      })
      .catch(e => (this.error = e));
  }

  googleSignin() {
    this.auth
      .googleSignin()
      .then(_ => {
        this.router.navigate([this.returnUrl]);
      })
      .catch(e => (this.error = e));
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  async emailLogin() {
    this.loading = true;
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    try {
      await this.auth.emailLogin(this.email.value, this.password.value);
      this.router.navigate([this.returnUrl]);
    } catch (err) {
      this.loading = false;
      this.error = err;
    }
  }
}
