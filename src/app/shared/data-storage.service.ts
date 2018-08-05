import {Injectable} from '@angular/core';
import {RecipeService} from '../recipes/recipe.service';
import {map} from 'rxjs/internal/operators';
import {Recipe} from '../recipes/recipe.model';
import {Observable} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import {HttpClient, HttpParams, HttpRequest} from '@angular/common/http';

@Injectable()
export class DataStorageService {
  private baseUrl = 'https://angular6-recipes.firebaseio.com/recipes.json';

  constructor(private httpClient: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) {
  }

  storeRecipes() {
    const token = this.authService.getToken();

    /* return this.httpClient.put(
       this.baseUrl,
       this.recipeService.getRecipes(),
       {params: new HttpParams().set('auth', token)}
     );*/

    const putRecipesRequest = new HttpRequest(
      'PUT',
      this.baseUrl,
      this.recipeService.getRecipes(),
      {
        reportProgress: true,
        params: new HttpParams().set('auth', token)
      }
    );

    return this.httpClient.request(putRecipesRequest);
  }

  fetchRecipes() {
    const token = this.authService.getToken();

    return this.httpClient.get<Recipe[]>(this.baseUrl + '?auth=' + token)
      .subscribe(
        (recipes: Recipe[]) => this.recipeService.setRecipes(recipes)
      );
  }

}
