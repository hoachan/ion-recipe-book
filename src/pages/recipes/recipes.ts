import { RecipePage } from './../recipe/recipe';
import { RecipesService } from './../../services/recipes';
import { Recipe } from './../../models/recipe';
import { EditRecipePage } from './../edit-recipe/edit-recipe';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RecipesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage implements OnInit {

  recipes : Recipe[];
  mockMobxRecipe : string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private recipesService : RecipesService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipesPage');
  }

  ionViewWillEnter(){
   this.recipes = this.recipesService.getRecipes();
   console.log('ionViewWillEnter');
  }
  onNewRecipe(){
    this.navCtrl.push(EditRecipePage, {mode : 'New'});
  }

  onLoadRecipe(recipe : Recipe, index : number){
    this.navCtrl.push(RecipePage, {recipe : recipe, index : index});
  }

  setMobxRecipe(mobxName : string){
    this.recipesService.setMobxRecipe(mobxName);
    // this.mockMobxRecipe = this.recipesService.getMobxRecipeName;
  }

  ngOnInit(){
    this.mockMobxRecipe = this.recipesService.getMobxRecipeName;
  }
}
