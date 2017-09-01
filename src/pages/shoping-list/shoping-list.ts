import { AuthService } from './../../services/auth';
import { SlOptionsPage } from './sl-options/sl-options';
import { Ingredient } from './../../models/ingredient';
import { ShoppingListService } from './../../services/shoping-list';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { NgForm } from "@angular/forms";

@IonicPage()
@Component({
  selector: 'page-shoping-list',
  templateUrl: 'shoping-list.html',
})
export class ShopingListPage {
  listItems : Ingredient[];

  constructor(
    public navCtrl: NavController, public navParams: NavParams, 
    private slService : ShoppingListService, private popoverCtrl : PopoverController,
    private authService : AuthService
    ) {
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

  onShowOptions(event : MouseEvent){
    const popover = this.popoverCtrl.create(SlOptionsPage);
    popover.present({ev :event});
    popover.onDidDismiss(
      data => {
        if (data.action == 'load') {
          this.authService.getActiveUser().getToken()
          .then(
            (token : string) => {
              this.slService.fetchList(token).subscribe(
                (list : Ingredient[]) => {
                  this.listItems = (list) ? list : [];
                  console.log(this.listItems);
                },
                error => {
                  console.log('there is error has content : ' + error);
                }
              )
            }
          );
        } else {
          this.authService.getActiveUser().getToken()
            .then(
              (token : string) => {
                this.slService.storeList(token).subscribe(
                  () => console.log('Success'),
                  error => {
                    console.log('there is error has content : ' + error);
                  }
                )
              }
            );
        }
      }
    )
  }
}
