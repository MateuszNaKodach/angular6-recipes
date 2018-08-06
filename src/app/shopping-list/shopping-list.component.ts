import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {Observable, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app.reducers';
import * as ShoppingListActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  shoppingListState: Observable<{ ingredients: Ingredient[] }>;
  private subscription: Subscription;

  constructor(private store: Store<AppState>) {
  }


  ngOnInit() {
    this.shoppingListState = this.store.select('shoppingList');
    /*this.subscription = this.shoppingListService.ingredientsChanged
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      );*/
  }

  onIngredientAdded(ingredient: Ingredient) {
    //  this.ingredients.push(ingredient);
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

  onEditItem(itemIndex: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(itemIndex));
  }
}
