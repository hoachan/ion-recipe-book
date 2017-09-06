import { Ingredient } from './ingredient';
import { observable, computed } from 'mobx-angular';
export class Recipe {
    @observable nameMobx: string;
    constructor(
        public title : string, 
        public description : string,
        public difficulty : string,
        public ingredients : Ingredient[]){}

    @computed get getNameMobx() : string {
        return this.nameMobx;
    }
}