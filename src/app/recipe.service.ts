import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
    private recipes: Recipe[] = [];
    private tab2Recipes: Recipe[] = [];  // Initialize as an empty array
    private tab2RecipesSubject = new BehaviorSubject<Recipe[]>(this.tab2Recipes);

    addToTab2Recipes(recipe: Recipe): void {
      console.log('Before Adding to Tab2:', this.tab2Recipes);
      this.tab2Recipes.push(recipe);
      console.log('After Adding to Tab2:', this.tab2Recipes);
      this.tab2RecipesSubject.next([...this.tab2Recipes]);
    }

  getTab2Recipes(): Observable<Recipe[]> {
    return this.tab2RecipesSubject.asObservable();
  }
  
  getRecipes(): Recipe[] {
    return this.recipes;
  }

  addToFavorites(recipe: Recipe): void {
    this.recipes.push(recipe);
  }

  removeFromFavorites(recipe: Recipe): void {
    const index = this.recipes.indexOf(recipe);
    if (index !== -1) {
      this.recipes.splice(index, 1);
    }
  }

  getFavoriteRecipes(): Recipe[] {
    return this.recipes;
  }

  loveRecipe(recipe: Recipe): void {
    // Remove from tab1
    this.removeFromFavorites(recipe);

    // Add to tab2
    const currentTab2Recipes = this.tab2RecipesSubject.value;
    this.tab2RecipesSubject.next([...currentTab2Recipes, recipe]);
  }

  getRecipeById(recipeId: string): Recipe | undefined {
    // Check in tab2Recipes
    const tab2Recipe = this.tab2Recipes.find(recipe => recipe.id === recipeId);
    if (tab2Recipe) {
      return tab2Recipe;
    }
  
    // Check in recipes
    return this.recipes.find(recipe => recipe.id === recipeId);
  }

  updateIngredients(recipeId: string | undefined, newIngredients: string[] | undefined): void {
    const recipe = this.recipes.find(r => r.id === recipeId);
    if (recipe) {
      this.tab2RecipesSubject.next([...this.tab2Recipes]);
    }
  }
}
