import { NgModule } from '@angular/core';

import { ThemeModule } from '../@theme/theme.module';
import { EditPostModule } from './edit-post/edit-post.module';
import { RecipeCardModule } from './recipe-card/recipe-card.module';
import { ConfirmDialogModule } from './confirm-dialog/confirm-dialog.module';

@NgModule({
  imports: [ThemeModule],
  exports: [EditPostModule, RecipeCardModule, ConfirmDialogModule]
})
export class SharedModule {}
