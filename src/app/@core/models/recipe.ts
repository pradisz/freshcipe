export interface Recipe {
  recipeId: string;
  cover: string;
  title: string;
  subtitle: string;
  prepTime: string;
  servingAmount: string;
  description: string;
  ingredients: [{ ingredient: string }];
  steps: [{ step: string }];
  author: {
    userId: string;
    username: string;
    displayName: string;
    photoURL: string;
  };
}

export interface FavouriteRecipe {
  userId: string;
  recipeId: string;
  title: string;
  subtitle: string;
  cover: string;
  author: {
    userId: string;
    username: string;
    displayName: string;
    photoURL: string;
  };
  prepTime: string;
}
