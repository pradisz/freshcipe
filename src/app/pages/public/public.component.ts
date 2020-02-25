import { Component } from '@angular/core';

@Component({
  selector: 'ngx-public-app',
  template: `
    <ngx-public-layout>
      <router-outlet></router-outlet>
    </ngx-public-layout>
  `
})
export class PublicComponent {}
