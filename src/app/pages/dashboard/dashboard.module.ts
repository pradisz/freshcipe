import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NbLayoutModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { DashboardHomeModule } from './home/home.module';
import { PostsModule } from './posts/posts.module';
import { MembersModule } from './members/members.module';
import { SharedModule } from '../../shared/shared.module';

import { DashboardComponent } from './dashboard.component';
import { DashboardHomeComponent } from './home/home.component';
import { PostsComponent } from './posts/posts.component';
import { EditPostComponent } from '../../shared/edit-post/edit-post.component';
import { MembersComponent } from './members/members.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: DashboardHomeComponent
      },
      {
        path: 'posts',
        component: PostsComponent
      },
      {
        path: 'add-post',
        component: EditPostComponent
      },
      {
        path: 'members',
        component: MembersComponent
      }
    ]
  }
];

const COMPONENT_MODULES = [
  DashboardHomeModule,
  PostsModule,
  MembersModule,
  SharedModule
];

@NgModule({
  imports: [
    NbLayoutModule,
    ThemeModule,
    ...COMPONENT_MODULES,
    RouterModule.forChild(routes)
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule {}
