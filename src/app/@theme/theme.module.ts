import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  NbActionsModule,
  NbLayoutModule,
  NbMenuModule,
  NbSearchModule,
  NbSidebarModule,
  NbUserModule,
  NbContextMenuModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbThemeModule,
  NbSpinnerModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { HeaderComponent } from './components';
import { WithLoadingPipe } from './pipes';
import {
  AuthLayoutComponent,
  DashboardLayoutComponent,
  PublicLayoutComponent
} from './layouts';
import { CORPORATE_THEME } from './styles/theme.corporate';

const MODULES = [
  NbLayoutModule,
  NbMenuModule,
  NbUserModule,
  NbActionsModule,
  NbSearchModule,
  NbSidebarModule,
  NbContextMenuModule,
  // NbSecurityModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbEvaIconsModule,
  NbSpinnerModule
];
const COMPONENTS = [
  AuthLayoutComponent,
  DashboardLayoutComponent,
  PublicLayoutComponent,
  HeaderComponent
];
const PIPES = [WithLoadingPipe];

@NgModule({
  imports: [CommonModule, RouterModule, ...MODULES, NgbDropdownModule],
  exports: [CommonModule, RouterModule, ...PIPES, ...COMPONENTS],
  declarations: [...COMPONENTS, ...PIPES]
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: ThemeModule,
      providers: [
        ...NbThemeModule.forRoot(
          {
            name: 'poppins'
          },
          [CORPORATE_THEME]
        ).providers
      ]
    };
  }
}
