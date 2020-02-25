import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../@core/services/auth.service';
import { PostService } from '../../../@core/services/post.service';
import { User } from '../../../@core/models/user';
import { Observable } from 'rxjs';
import { take, map, concatMap } from 'rxjs/operators';

@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  authUser: User;
  user: User;
  userRecipes$: Observable<any>;
  userFavourites$: Observable<any>;

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    public auth: AuthService,
    private postService: PostService
  ) {
    this.auth.user$.subscribe(user => {
      this.authUser = user;
    });

    this.route.paramMap
      .pipe(
        map(param => {
          const username = param.get('username');
          return username;
        }),
        concatMap(username => {
          return this.auth.getProfile(username).pipe(
            take(1),
            map((user: User[]) => {
              this.titleService.setTitle(`${user[0].displayName} | Freshcipe`);
              return (this.user = user[0]);
            }),
            concatMap(user => {
              this.userRecipes$ = this.postService.getUserRecipes(user.uid);
              this.userFavourites$ = this.postService.getUserFavourites(
                user.uid
              );
              return user.uid;
            })
          );
        })
      )
      .subscribe();
  }

  onSaveFavourite(isFavourite: boolean) {
    if (isFavourite) {
      alert('Removed from your favourite');
    } else {
      alert('Saved to your favourite');
    }
  }
}
