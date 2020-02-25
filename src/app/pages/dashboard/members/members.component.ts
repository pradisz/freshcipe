import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../@core/services/auth.service';
import { MemberService } from '../../../@core/services/member.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'ngx-dashboard-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  members$: Observable<any>;
  constructor(public auth: AuthService, private memberService: MemberService) {}

  ngOnInit() {
    this.members$ = this.memberService.getMembersList();
  }
}
