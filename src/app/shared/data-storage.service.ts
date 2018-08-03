import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {RecipeService} from '../recipes/recipe.service';
import {map} from 'rxjs/internal/operators';
import {Recipe} from '../recipes/recipe.model';
import {Observable} from 'rxjs';

@Injectable()
export class DataStorageService {
  private baseUrl = 'https://angular6-recipes.firebaseio.com/recipes.json';

  constructor(private http: Http, private recipeService: RecipeService) {
  }

  storeRecipes() {
    return this.http.put(this.baseUrl, this.recipeService.getRecipes());
  }

  fetchRecipes() {
    return this.http.get(this.baseUrl)
      .pipe(
        map((response: Response) => response.json())
      ).subscribe(
        (recipes: Recipe[]) => this.recipeService.setRecipes(recipes)
      );
  }

}
