import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import {
  NbLayoutModule,
  NbInputModule,
  NbButtonModule,
  NbAlertModule,
  NbSpinnerModule
} from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  declarations: [AuthComponent, LoginComponent, RegisterComponent],
  imports: [
    ReactiveFormsModule,
    ThemeModule,
    NbLayoutModule,
    NbInputModule,
    NbButtonModule,
    NbAlertModule,
    NbSpinnerModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthModule {}
