import { Ingredient } from './../models/ingredient';
import { Recipe } from './../models/recipe';
import { observable, action, computed } from 'mobx-angular';

export class RecipesService {
    private recipes : Recipe[] = [];

    @observable mobxRecipe : string = "initialize";

    @action setMobxRecipe (mobxRecipe : string){
        this.mobxRecipe = mobxRecipe;
    }

    @computed get getMobxRecipeName(){
        return this.mobxRecipe;
    }
    addRecipe(  title : string, 
                description : string, 
                difficulty : string, 
                ingredients : Ingredient[]){
       this.recipes.push(new Recipe(title, description, difficulty, ingredients));
       console.log(this.recipes);             
    }

    getRecipes () {
        return this.recipes.slice();
    }

    updateRecipe(   index : number,
                    title :string,
                    description : string,
                    difficulty : string,
                    ingredients : Ingredient[]){
        this.recipes[index] = new Recipe(title, description, difficulty, ingredients);
    }

    removeRecipe(index : number){
        this.recipes.splice(index, 1);
    }
}