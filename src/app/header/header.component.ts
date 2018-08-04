import {Component, EventEmitter, Output} from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';
import {Recipe} from '../recipes/recipe.model';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {
  }

  onSaveData() {
    this.dataStorageService.storeRecipes()
      .subscribe();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes();
  }

  onLogout() {
    this.authService.logout();
  }
}
