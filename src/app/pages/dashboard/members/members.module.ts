import { NgModule } from '@angular/core';
import {
  NbSpinnerModule,
  NbCardModule,
  NbListModule,
  NbButtonModule
} from '@nebular/theme';

import { ThemeModule } from '../../../@theme/theme.module';

import { MemberPipe } from './member.pipe';
import { MembersComponent } from './members.component';

@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbSpinnerModule,
    NbListModule,
    NbButtonModule
  ],
  declarations: [MembersComponent, MemberPipe],
  exports: [MembersComponent]
})
export class MembersModule {}
