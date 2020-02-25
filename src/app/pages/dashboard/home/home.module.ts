import { NgModule } from '@angular/core';
import { NbButtonModule, NbSpinnerModule } from '@nebular/theme';

import { ThemeModule } from '../../../@theme/theme.module';

import { DashboardHomeComponent } from './home.component';

@NgModule({
  imports: [ThemeModule, NbButtonModule, NbSpinnerModule],
  declarations: [DashboardHomeComponent],
  exports: [DashboardHomeComponent]
})
export class DashboardHomeModule {}
