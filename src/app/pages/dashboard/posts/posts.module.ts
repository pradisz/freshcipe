import { NgModule } from '@angular/core';
import { NbButtonModule, NbSpinnerModule } from '@nebular/theme';

import { ThemeModule } from '../../../@theme/theme.module';

import { PostsComponent } from './posts.component';

@NgModule({
  imports: [ThemeModule, NbButtonModule, NbSpinnerModule],
  declarations: [PostsComponent],
  exports: [PostsComponent]
})
export class PostsModule {}
