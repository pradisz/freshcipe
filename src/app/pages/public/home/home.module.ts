import { NgModule } from '@angular/core';
import { NbButtonModule, NbSpinnerModule } from '@nebular/theme';

import { ThemeModule } from '../../../@theme/theme.module';
import { SharedModule } from '../../../shared/shared.module';

import { PublicHomeComponent } from './home.component';

@NgModule({
  imports: [ThemeModule, NbButtonModule, NbSpinnerModule, SharedModule],
  declarations: [PublicHomeComponent],
  exports: [PublicHomeComponent]
})
export class PublicHomeModule {}
