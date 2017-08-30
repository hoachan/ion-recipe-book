import { Ingredient } from './../../models/Ingredient';
import { ShoppingListService } from './../../services/shoping-list';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from "@angular/forms";

@IonicPage()
@Component({
  selector: 'page-shoping-list',
  templateUrl: 'shoping-list.html',
})
export class ShopingListPage {
  listItems : Ingredient[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private slService : ShoppingListService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopingListPage');
  }

  ionViewWillEnter(){
   this.loadItems();
   console.log('ionViewWillEnter ShopingListPage');
  }
  onAddItem(form : NgForm){
    console.log(form);
    this.slService.addItem(form.value.ingredientName, form.value.amount);
    form.reset();
    this.loadItems();
  }

  private loadItems(){
    this.listItems = this.slService.getItems();
  }

  onCheckItem(index : number){
    this.slService.removeItem(index);
    this.loadItems();
  }
}
