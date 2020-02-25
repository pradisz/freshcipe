import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../@core/services/auth.service';

@Component({
  selector: 'ngx-register',
  templateUrl: 'register.component.html',
  styleUrls: ['../auth.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
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
    this.titleService.setTitle('Join | Freshcipe');
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  facebookSignin() {
    this.auth
      .facebookSignin()
      .then(_ => {
        this.router.navigate([this.returnUrl]);
      })
      .catch(err => (this.error = err));
  }

  googleSignin() {
    this.auth
      .googleSignin()
      .then(_ => {
        this.router.navigate([this.returnUrl]);
      })
      .catch(err => (this.error = err));
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  async emailSignup() {
    this.loading = true;
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    try {
      await this.auth.emailSignUp(this.email.value, this.password.value);
      this.router.navigate([this.returnUrl]);
    } catch (err) {
      this.loading = false;
      this.error = err;
    }
  }
}
