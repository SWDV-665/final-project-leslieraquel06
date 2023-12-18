// add-recipe.page.ts
import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { RecipeService } from '../recipe.service';
import { NavController } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { Recipe } from '../recipe.model';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-recipe',
  templateUrl: 'add-recipe.page.html',
  styleUrls: ['add-recipe.page.scss'],
})
export class AddRecipePage {
  recipe: Recipe = {
    id: uuidv4(),
    name: '',
    photo: '',
    ingredients: '',
  };

  selectedImage: string | undefined;
  recipes: any;

  constructor(private recipeService: RecipeService, private navCtrl: NavController) {}

  async takePicture() {
    try {
      let image;

      if (Capacitor.getPlatform() === 'web') {
        image = await Camera.getPhoto({
          resultType: CameraResultType.Uri,
          source: CameraSource.Photos,
          quality: 100,
        });
      } else {
        image = await Camera.getPhoto({
          resultType: CameraResultType.Uri,
          source: CameraSource.Camera,
          quality: 100,
        });
      }

      if (image && image.webPath) {
        this.selectedImage = image.webPath;
      } else if (image && image.path) {
        this.selectedImage = Capacitor.convertFileSrc(image.path);
      }

      console.log(this.selectedImage);
    } catch (error) {
      console.error('Error taking picture:', error);
    }
  }

  addToFavorites(recipe: Recipe | undefined): void {
    if (recipe) {
      this.recipes.push(recipe);
    }
  }
  
  saveRecipe() {
    this.recipe.photo = this.selectedImage || '';

    this.recipeService.addToFavorites(this.recipe);

    // Navigate back to the Tab1 page
    this.navCtrl.navigateBack('/tabs/tab1');
  }
}
