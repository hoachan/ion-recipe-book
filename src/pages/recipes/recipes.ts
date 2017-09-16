import { AddBookAction } from './../../actions/book';
import { RecipePage } from './../recipe/recipe';
import { RecipesService } from './../../services/recipes';
import { Recipe } from './../../models/recipe';
import { EditRecipePage } from './../edit-recipe/edit-recipe';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {Store} from "@ngrx/store";
import {Observable} from "rxjs";

/**
 * Import the root state in order to select parts of it.
 */
// import * as fromRoot from '../../common/index';
/*
 * Import the layout actions to make dispatching from the component possible.
 */
// import * as layout from '../../common/layout/layout.actions';

import { Book } from './../../models/book';

import * as fromRoot from '../../reducers';

import * as bookAction from '../../actions/book';

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage implements OnInit{

  recipes : Recipe[];
  books  ?: Book[] | any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private recipesService : RecipesService,
    private store: Store<fromRoot.AppState>
  ) {
  }

  ngOnInit() {
    // console.log(this.store);
    // this.store.dispatch(new layout.OpenModalAction('modalName'));
    this.books = this.store.select(fromRoot.getBookState);
    console.log(this.books);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipesPage');
  }

  ionViewWillEnter(){
   this.recipes = this.recipesService.getRecipes();
  }
  onNewRecipe(){
    this.navCtrl.push(EditRecipePage, {mode : 'New'});
  }

  onLoadRecipe(recipe : Recipe, index : number){
    this.navCtrl.push(RecipePage, {recipe : recipe, index : index});
  }

  addBook(){
    let id = '1';
    let newBook : Book = {
      id : '1',
      volumeInfo : {
          title : 'the secret of success',
          author : ['andy chan', 'lady gaga'],
          description : 'string type',
          publishDate : '2017/09/15',
          ratingCount : 2
      }
    }

    this.store.dispatch(new bookAction.AddBookAction(newBook));
  }
}
