import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { NbButtonModule } from '@nebular/theme';

import { RecipeCardComponent } from './recipe-card.component';

@NgModule({
  imports: [ThemeModule, NbButtonModule],
  exports: [RecipeCardComponent],
  declarations: [RecipeCardComponent],
  providers: []
})
export class RecipeCardModule {}
