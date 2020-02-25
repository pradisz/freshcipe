import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-dashboard-app',
  template: `
    <ngx-dashboard-layout>
      <router-outlet></router-outlet>
    </ngx-dashboard-layout>
  `
})
export class DashboardComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
