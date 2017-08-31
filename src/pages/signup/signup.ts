import { AuthService } from './../../services/auth';
import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(
              public navCtrl: NavController, 
              public navParams: NavParams,
              private authService : AuthService,
              private loadingCtrl : LoadingController,
              private alertCtrl : AlertController
            ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  onSignup(form : NgForm){
    console.log(form);
    const loading = this.loadingCtrl.create({
      content : 'i am loading...'
    });
    this.authService.signup(form.value.email, form.value.password).then(data => {
      console.log(data);
      loading.dismiss();
    }).catch(error => {
      console.log(error);
      loading.dismiss();
      const alert = this.alertCtrl.create({
        title : 'Singup faild',
        message : error.message,
        buttons : ['Ok']
      });
      alert.present();
    });
  }
}
