import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../@core/services/auth.service';
import { PostService } from '../../../@core/services/post.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'ngx-dashboard-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts$: Observable<any>;

  constructor(public auth: AuthService, private postService: PostService) {}

  ngOnInit() {
    this.posts$ = this.postService.getRecipeList();
  }
}
