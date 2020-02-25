import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { redirectUnauthorizedTo, canActivate } from '@angular/fire/auth-guard';

import { NbLayoutModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { PublicHomeModule } from './home/home.module';
import { RecipeModule } from './recipe/recipe.module';
import { ProfileModule } from './profile/profile.module';
import { SettingsModule } from './settings/settings.module';
import { SharedModule } from '../../shared/shared.module';

import { PublicComponent } from './public.component';
import { PublicHomeComponent } from './home/home.component';
import { RecipeComponent } from './recipe/recipe.component';
import { EditPostComponent } from '../../shared/edit-post/edit-post.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';

const redirectUnauthorizedToLogin = redirectUnauthorizedTo(['auth']);

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      {
        path: '',
        component: PublicHomeComponent
      },
      {
        path: 'recipe/:id',
        component: RecipeComponent
      },
      {
        path: 'add-recipe',
        component: EditPostComponent
      },
      {
        path: 'edit-recipe/:id',
        component: EditPostComponent
      },
      {
        path: 'user/:username',
        component: ProfileComponent,
        ...canActivate(redirectUnauthorizedToLogin)
      },
      {
        path: 'settings',
        component: SettingsComponent,
        ...canActivate(redirectUnauthorizedToLogin)
      }
    ]
  }
];

@NgModule({
  imports: [
    NbLayoutModule,
    ThemeModule,
    PublicHomeModule,
    RecipeModule,
    ProfileModule,
    SettingsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PublicComponent]
})
export class PublicModule {}
