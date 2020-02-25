import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  NbInputModule,
  NbButtonModule,
  NbAlertModule,
  NbSpinnerModule
} from '@nebular/theme';
import { ThemeModule } from '../../../@theme/theme.module';

import { SettingsComponent } from './settings.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    ThemeModule,
    NbInputModule,
    NbButtonModule,
    NbAlertModule,
    NbSpinnerModule
  ],
  declarations: [SettingsComponent],
  exports: [SettingsComponent]
})
export class SettingsModule {}
