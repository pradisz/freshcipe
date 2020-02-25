import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { Recipe, FavouriteRecipe } from '../models/recipe';
import { tap } from 'rxjs/operators';

@Injectable()
export class PostService {
  constructor(private afs: AngularFirestore) {}

  /**
   *
   * Fetch recipe list
   */
  getRecipeList() {
    return this.afs
      .collection<Recipe>('recipes', ref => ref.orderBy('createdAt', 'desc'))
      .valueChanges({ idField: 'id' })
      .pipe(tap(arr => console.log(`Fetched ${arr.length} recipes`)));
  }

  /**
   *
   * Fetch recipe by id
   */
  getRecipeById(recipeId: string) {
    return this.afs
      .collection<Recipe>('recipes')
      .doc(recipeId)
      .valueChanges();
  }

  /**
   *
   * Post submitted users recipe
   */
  submitRecipe(recipe: Recipe) {
    return this.afs.collection<Recipe>('recipes').add(recipe);
  }

  /**
   *
   * Update post users recipe
   */
  updateRecipe(recipeId: string, recipe: Recipe) {
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();

    const updatedRecipe = {
      ...recipe,
      updatedAt: timestamp
    };

    return this.afs
      .collection<Recipe>('recipes')
      .doc(recipeId)
      .update(updatedRecipe);
  }

  /**
   *
   * Delete post users recipe
   */
  deleteRecipe(recipeId: string) {
    return this.afs
      .collection<Recipe>('recipes')
      .doc(recipeId)
      .delete();
  }

  /**
   *
   * Fetch recipes created by user
   */
  getUserRecipes(userId: string) {
    return this.afs
      .collection('recipes', ref => ref.where('author.userId', '==', userId))
      .valueChanges({ idField: 'id' })
      .pipe(tap(arr => console.log(`Fetched ${arr.length} user recipes`)));
  }

  /**
   *
   * Fetch user favourites recipes
   */
  getUserFavourites(userId: string) {
    return this.afs
      .collection('favourites', ref => ref.where('userId', '==', userId))
      .valueChanges({ idField: 'id' })
      .pipe(
        tap(arr => console.log(`Fetched ${arr.length} user favourited recipes`))
      );
  }

  /**
   *
   * Check if recipe is user favourites
   */
  checkUserFavourites(userId: string, recipeId: string) {
    return this.afs
      .collection('favourites')
      .doc(`${userId}_${recipeId}`)
      .ref.get();
  }

  /**
   *
   * Save recipe to users favourite
   * if recipe already favourited by user,
   * remove the recipe from users favourite
   * @param recipe: postData
   */
  saveRecipe(recipe: FavouriteRecipe) {
    const favRef = this.afs
      .collection('favourites')
      .doc(`${recipe.userId}_${recipe.recipeId}`);

    return favRef.ref
      .get()
      .then(doc => {
        if (doc.exists) {
          return favRef
            .delete()
            .then(_ => {
              return 'Recipe removed from your favourites';
            })
            .catch(err => {
              console.error(err);
              return err;
            });
        } else {
          return favRef
            .set(recipe)
            .then(_ => {
              return 'Recipe saved to your favourites';
            })
            .catch(err => {
              console.error(err);
              return err;
            });
        }
      })
      .catch(err => {
        console.error(`'Error getting recipe: ${err}`);
      });
  }
}
