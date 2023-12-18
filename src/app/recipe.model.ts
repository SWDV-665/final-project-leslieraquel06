export class Recipe {
  id: string;
  name: string;
  photo: string;
  ingredients: string; // Change the type to an array

  constructor(id: string, name: string, photo: string, ingredients: string) {
    this.id = id;
    this.name = name;
    this.photo = photo;
    this.ingredients = ingredients;
  }
}
