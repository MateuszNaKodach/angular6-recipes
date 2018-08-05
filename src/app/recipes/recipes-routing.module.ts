import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../auth/auth-guard.service';
import {RecipesComponent} from './recipes.component';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {RecipeStartComponent} from './recipe-start/recipe-start.component';
import {RecipeEditComponent} from './recipe-edit/recipe-edit.component';

const recipesRoutes: Routes = [
  {
    // path: 'recipes', component: RecipesComponent, children: [
    path: '', component: RecipesComponent, children: [ //Changed cause of lazy loading
      {path: '', component: RecipeStartComponent},
      {path: 'new', component: RecipeEditComponent, canActivate: [AuthGuard]},
      {path: ':id', component: RecipeDetailComponent},
      {path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuard]}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(recipesRoutes)
  ],
  exports: [RouterModule]
})
export class RecipesRoutingModule {
}

/*
https://www.udemy.com/the-complete-guide-to-angular-2/learn/v4/t/lecture/6656742?start=0
What if you want to use route protection (canActivate  to be precise) on lazily loaded routes?

You can add canActivate to the lazy loaded routes but that of course means, that you might load code which in the end can't get accessed anyways. It would be better to check that BEFORE loading the code.

You can enforce this behavior by adding the canLoad  guard to the route which points to the lazily loaded module:

{ path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule', canLoad: [AuthGuard] }

In this example, the AuthGuard  should implement the CanLoad interface.
 */
