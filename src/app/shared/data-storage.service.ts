import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {RecipeService} from '../recipes/recipe.service';
import {map} from 'rxjs/internal/operators';
import {Recipe} from '../recipes/recipe.model';
import {Observable} from 'rxjs';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class DataStorageService {
  private baseUrl = 'https://angular6-recipes.firebaseio.com/recipes.json';

  constructor(private http: Http,
              private recipeService: RecipeService,
              private authService: AuthService) {
  }

  storeRecipes() {
    const token = this.authService.getToken();

    return this.http.put(this.baseUrl + '?auth=' + token, this.recipeService.getRecipes());
  }

  fetchRecipes() {
    const token = this.authService.getToken();

    return this.http.get(this.baseUrl + '?auth=' + token)
      .pipe(
        map((response: Response) => response.json())
      ).subscribe(
        (recipes: Recipe[]) => this.recipeService.setRecipes(recipes)
      );
  }

}
