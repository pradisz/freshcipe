import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-auth-app',
  template: `
    <ngx-auth-layout>
      <router-outlet></router-outlet>
    </ngx-auth-layout>
  `
})
export class AuthComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
