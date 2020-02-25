import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../@core/services/auth.service';
import { PostService } from '../../../@core/services/post.service';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'ngx-public-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class PublicHomeComponent implements OnInit {
  posts$: Observable<any>;

  constructor(
    private titleService: Title,
    public auth: AuthService,
    private postService: PostService
  ) {
    this.titleService.setTitle('Freshcipe');
  }

  ngOnInit() {
    this.posts$ = this.postService.getRecipeList();
  }
}
