import { RecipesPage } from './../recipes/recipes';
import { RecipePage } from './../recipe/recipe';
import { ShopingListPage } from './../shoping-list/shoping-list';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  slPage = ShopingListPage;
  recipesPage = RecipesPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
