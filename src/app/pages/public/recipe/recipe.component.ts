import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../@core/services/auth.service';
import { PostService } from '../../../@core/services/post.service';
import { NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { User } from '../../../@core/models/user';
import { Recipe } from '../../../@core/models/recipe';
import { Observable } from 'rxjs';
import { take, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'ngx-recipe-detail',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {
  user: User;
  recipeId: string;
  recipe$: Observable<any>;
  isFavourite = false;

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private auth: AuthService,
    private postService: PostService,
    private toastrService: NbToastrService
  ) {}

  ngOnInit() {
    this.recipeId = this.route.snapshot.paramMap.get('id');
    this.recipe$ = this.postService.getRecipeById(this.recipeId);
    this.recipe$.pipe(take(1)).subscribe((recipe: Recipe) => {
      this.titleService.setTitle(`${recipe.title} | Freshcipe`);
    });

    // check if recipe is users favourite
    this.auth.user$
      .pipe(
        take(1),
        mergeMap(currentUser => {
          this.user = currentUser;
          return this.postService
            .checkUserFavourites(currentUser.uid, this.recipeId)
            .then(doc => {
              if (doc.exists) {
                return (this.isFavourite = true);
              } else {
                return (this.isFavourite = false);
              }
            });
        })
      )
      .subscribe();
  }

  checkFavourites() {
    this.postService
      .checkUserFavourites(this.user.uid, this.recipeId)
      .then(_ => {
        this.isFavourite = !this.isFavourite;
      });
  }

  async saveRecipe(recipe: Recipe) {
    const postData = {
      userId: this.user.uid,
      recipeId: this.recipeId,
      title: recipe.title,
      subtitle: recipe.subtitle,
      cover: recipe.cover,
      author: {
        userId: recipe.author.userId,
        username: recipe.author.username,
        displayName: recipe.author.displayName,
        photoURL: recipe.author.photoURL
      },
      prepTime: recipe.prepTime
    };
    this.postService.saveRecipe(postData).then(res => {
      this.toastrService.success('', res, {
        hasIcon: false,
        position: NbGlobalPhysicalPosition.BOTTOM_LEFT
      });
    });
    this.checkFavourites();
  }
}
