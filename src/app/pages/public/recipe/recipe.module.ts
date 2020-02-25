import { NgModule } from '@angular/core';
import {
  NbSpinnerModule,
  NbCheckboxModule,
  NbButtonModule
} from '@nebular/theme';

import { ThemeModule } from '../../../@theme/theme.module';
import { SharedModule } from '../../../shared/shared.module';

import { RecipeComponent } from './recipe.component';

@NgModule({
  imports: [
    ThemeModule,
    NbSpinnerModule,
    NbCheckboxModule,
    NbButtonModule,
    SharedModule
  ],
  declarations: [RecipeComponent],
  exports: [RecipeComponent]
})
export class RecipeModule {}
