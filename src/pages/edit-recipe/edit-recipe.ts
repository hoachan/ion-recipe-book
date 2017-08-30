import { Recipe } from './../../models/recipe';
import { RecipesService } from './../../services/recipes';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { 
        IonicPage, 
        NavController, 
        NavParams, 
        ActionSheetController, 
        AlertController, 
        ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit {

  mode = 'New';
  selectOptions = ['easy', 'medium', 'hard'];
  recipeForm : FormGroup;
  recipe : Recipe;
  index : number;

  constructor(public navCtrl: NavController,
             public navParams: NavParams,
             public actionSheetController : ActionSheetController,
             private alertCtrl : AlertController,
             private toastCtrl : ToastController,
             private recipesService : RecipesService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditRecipePage');
  }

  ngOnInit(){
    this.mode = this.navParams.get('mode');
    if (this.mode == 'Edit'){
      this.recipe = this.navParams.get('recipe');
      this.index = this.navParams.get('index');
    }
    this.initializeForm();
  }

  private initializeForm(){
    let title = null;
    let description = null;
    let difficulty = 'medium';
    let ingredients = [];

    if (this.mode == 'Edit'){
      title = this.recipe.title;
      description = this.recipe.description;
      difficulty = this.recipe.difficulty;
      for(let ingredient of this.recipe.ingredients ) {
        ingredients.push(new FormControl(ingredient.name, Validators.required));
      }
    }

    this.recipeForm = new FormGroup({
      'title' : new FormControl(title, Validators.required),
      'description' : new FormControl(description, Validators.required),
      'difficulty' : new FormControl(difficulty, Validators.required),
      'ingredients' : new FormArray(ingredients)
    });
  }

  onSubmit(){
    console.log(this.recipeForm);
    const value = this.recipeForm.value;
    let ingredients = [];

    if (value.ingredients.length > 0){
      ingredients = value.ingredients.map(name => {
        return {name : name , amount : 1}
      });
    }

    if (this.mode == 'Edit'){
      this.recipesService.updateRecipe(this.index, value.title, value.description, value.difficulty, ingredients)
    } else{
      this.recipesService.addRecipe(value.title, value.description, value.difficulty, ingredients);
    }
    this.recipeForm.reset();
    this.navCtrl.popToRoot();
  }

  onManageIngredients(){
    const actionSheet = this.actionSheetController.create({
      'title' : 'What do u want to do?',
      buttons : [
        {
          text : 'Add Ingredient',
          handler: () => {
            this.createNewIngredientAlert().present();
          }
        },
        {
          text : 'Remove all Ingredients ',
          role : 'destructive',
          handler : () => {
            const fArray : FormArray = <FormArray>this.recipeForm.get('ingredients');
            const len = fArray.length;
            if (len > 0) {
              for (let i = len -1; i >= 0; i--){
                fArray.removeAt(i);
              }
            }
            const toast =  this.toastCtrl.create({
              message : 'Ingredient was deleted !',
              duration : 1500,
              position :'bottom'
            });
            toast.present();
          }
        },
        {
          text : 'Cancel',
          role : 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  private createNewIngredientAlert(){
    return this.alertCtrl.create({
      title : 'Add Ingredient',
      inputs : [
        {
          name : 'name',
          placeholder : 'Name'
        }
      ],
      buttons : [
        {
          text : 'Cancel',
          role : 'cancel'
        },
        {
          text : 'Add',
          handler : data => {
            if (data.name.trim() == '' || data.name == null) {
              const toast =  this.toastCtrl.create({
                message : 'Please enter a valid value !',
                duration : 2000,
                position :'bottom'
              });
              toast.present();
              return ;
            }

            (<FormArray>this.recipeForm.get('ingredients')).
              push(new FormControl(data.name, Validators.required));
          }
        }
      ]
    });
  }
}
