import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '../../@core/models/recipe';
import { User } from '../../@core/models/user';

@Component({
  selector: 'ngx-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent {
  @Input() recipe: Recipe;
  @Input() showActionBtn = false;
  @Input() authUser: User;

  constructor(private router: Router) {}

  editRecipe() {
    this.router.navigate(['/edit-recipe', this.recipe.recipeId]);
  }
}
