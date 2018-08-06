import {Injectable} from '@angular/core';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {HttpClient, HttpParams, HttpRequest} from '@angular/common/http';

@Injectable()
export class DataStorageService {
  private baseUrl = 'https://angular6-recipes.firebaseio.com/recipes.json';

  constructor(private httpClient: HttpClient,
              private recipeService: RecipeService) {
  }

  storeRecipes() {
    /* return this.httpClient.put(
       this.baseUrl,
       this.recipeService.getRecipes(),
       {params: new HttpParams().set('auth', token)}
     );*/

    /*const putRecipesRequest = new HttpRequest(
      'PUT',
      this.baseUrl,
      this.recipeService.getRecipes(),
      {
        reportProgress: true,
        params: new HttpParams().set('auth', token)
      }
    );*/

    const putRecipesRequest = new HttpRequest(
      'PUT',
      this.baseUrl,
      this.recipeService.getRecipes(),
      {
        reportProgress: true
      }
    );

    return this.httpClient.request(putRecipesRequest); // Here token is passed by interceptor.
  }

  fetchRecipes() {
    return this.httpClient.get<Recipe[]>(this.baseUrl)
      .subscribe(
        (recipes: Recipe[]) => this.recipeService.setRecipes(recipes)
      );
  }

}
