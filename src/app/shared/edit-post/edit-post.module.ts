import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  NbSpinnerModule,
  NbIconModule,
  NbTooltipModule,
  NbInputModule,
  NbCheckboxModule,
  NbButtonModule,
  NbDialogModule
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';

import { EditPostComponent } from './edit-post.component';

@NgModule({
  imports: [
    ThemeModule,
    ReactiveFormsModule,
    NbSpinnerModule,
    NbIconModule,
    NbTooltipModule,
    NbInputModule,
    NbCheckboxModule,
    NbButtonModule,
    NbDialogModule.forChild()
  ],
  declarations: [EditPostComponent],
  exports: [EditPostComponent]
})
export class EditPostModule {}
