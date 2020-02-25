import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../@core/services/auth.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(public router: Router, public auth: AuthService) {}

  navigateHome() {
    this.router.navigate(['/auth/login']);
  }
}
