import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  recipes: Recipe[] = [];

  constructor(private router: Router, private recipeService: RecipeService) {}

  ngOnInit() {
    // Fetch your recipe data from the service using getRecipes
    this.recipes = this.recipeService.getRecipes();
  }

  deleteRecipe(recipe: Recipe) {
    this.recipeService.removeFromFavorites(recipe);
    this.recipes = this.recipeService.getFavoriteRecipes();
  }

  loveRecipe(recipe: Recipe): void {
    console.log('Love recipe called');
    
    // Assuming that `removeFromFavorites` and `addToTab2Recipes` are methods in your RecipeService
    this.recipeService.removeFromFavorites(recipe);
    this.recipeService.addToTab2Recipes(recipe);
  }

  viewRecipeDetails(recipeId: string) {
    // Use Angular Router consistently
    this.router.navigate(['/recipe-details', recipeId]);
  }
  
  addRecipe() {
    this.router.navigate(['/add-recipe']);
  }
}
