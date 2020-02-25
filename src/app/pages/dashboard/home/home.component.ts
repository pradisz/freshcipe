import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../@core/services/auth.service';

@Component({
  selector: 'ngx-dashboard-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class DashboardHomeComponent implements OnInit {
  constructor(public auth: AuthService) {}

  ngOnInit() {}
}
