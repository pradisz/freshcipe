import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { NbButtonModule, NbDialogModule } from '@nebular/theme';

import { ConfirmDialogComponent } from './confirm-dialog.component';

@NgModule({
  imports: [ThemeModule, NbButtonModule, NbDialogModule.forChild()],
  declarations: [ConfirmDialogComponent],
  entryComponents: [ConfirmDialogComponent]
})
export class ConfirmDialogModule {}
