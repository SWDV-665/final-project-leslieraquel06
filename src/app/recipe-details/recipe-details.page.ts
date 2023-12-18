import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-details',
  templateUrl: 'recipe-details.page.html',
  styleUrls: ['recipe-details.page.scss'],
})
export class RecipeDetailsPage implements OnInit {
  recipe: Recipe | undefined;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: { get: (arg0: string) => any; }) => {
      const recipeId = params.get('id');
      console.log('Recipe ID:', recipeId);
  
      // Fetch the recipe using recipeId from your service
      this.recipe = this.recipeService.getRecipeById(recipeId);
  
      if (!this.recipe) {
        console.error('Recipe not found');
        // You might want to handle this case, e.g., redirect to an error page
      }
  
      console.log('Recipe Data:', this.recipe);
    });
  }
  
  logPhotoValue() {
    console.log('Recipe Photo Value:', this.recipe?.photo);
  }
}
