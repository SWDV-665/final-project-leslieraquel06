import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  tab2Recipes: Recipe[] = [];
  recipes: Recipe[] | undefined;

  constructor(private recipeService: RecipeService, private navCtrl: NavController) {}

  ngOnInit() {
    this.recipeService.getTab2Recipes().subscribe((recipes) => {
      this.tab2Recipes = recipes;
    });
  }

  deleteRecipe(recipe: Recipe) {
    // Call the removeFromFavorites method from the service
    this.recipeService.removeFromFavorites(recipe);

    // Update the tab2Recipes array
    this.tab2Recipes = this.recipeService.getFavoriteRecipes();
  }

  goToRecipeDetails(recipeId: string) {
    this.navCtrl.navigateForward(`/recipe-details/${recipeId}`);
  }
}

