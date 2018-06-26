import {Component, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe(
      'A test recipe 1',
      'This is simple a test number 1',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0j8uVnrlJtD1gVey3RmCWFayMWKPueSq9OKQxLBE7tRvy-Ph5'
    ),
    new Recipe(
      'A test recipe 1',
      'This is simple a test number 1',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0j8uVnrlJtD1gVey3RmCWFayMWKPueSq9OKQxLBE7tRvy-Ph5'
    ),
    new Recipe(
      'A test recipe 1',
      'This is simple a test number 1',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0j8uVnrlJtD1gVey3RmCWFayMWKPueSq9OKQxLBE7tRvy-Ph5'
    ),
    new Recipe(
      'A test recipe 1',
      'This is simple a test number 1',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0j8uVnrlJtD1gVey3RmCWFayMWKPueSq9OKQxLBE7tRvy-Ph5'
    )
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
