import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'A test recipe 1',
      'This is simple a test number 1',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0j8uVnrlJtD1gVey3RmCWFayMWKPueSq9OKQxLBE7tRvy-Ph5',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]
    ),
    new Recipe(
      'A test recipe 2',
      'This is simple a test number 2',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0j8uVnrlJtD1gVey3RmCWFayMWKPueSq9OKQxLBE7tRvy-Ph5',
      []
    ),
    new Recipe(
      'A test recipe 3',
      'This is simple a test number 3',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0j8uVnrlJtD1gVey3RmCWFayMWKPueSq9OKQxLBE7tRvy-Ph5',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ]
    ),
    new Recipe(
      'A test recipe 4',
      'This is simple a test number 4',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0j8uVnrlJtD1gVey3RmCWFayMWKPueSq9OKQxLBE7tRvy-Ph5',
      []
    )
  ];


  constructor(private slService: ShoppingListService) {
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.notifyOnRecipesChanged();
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.notifyOnRecipesChanged();
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.notifyOnRecipesChanged();
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.notifyOnRecipesChanged();
  }

  private notifyOnRecipesChanged() {
    this.recipesChanged.next(this.recipes.slice());
  }
}
