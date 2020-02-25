import { NgModule } from '@angular/core';
import { NbSpinnerModule, NbButtonModule } from '@nebular/theme';

import { ThemeModule } from '../../../@theme/theme.module';
import { SharedModule } from '../../../shared/shared.module';

import { ProfileComponent } from './profile.component';

@NgModule({
  imports: [ThemeModule, SharedModule, NbSpinnerModule, NbButtonModule],
  declarations: [ProfileComponent],
  exports: [ProfileComponent]
})
export class ProfileModule {}
