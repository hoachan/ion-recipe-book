import { AuthService } from './../../services/auth';
import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor(
                public navCtrl: NavController, 
                public navParams: NavParams,
                private authService : AuthService,
                private alertCtrl : AlertController,
                private loadingCtrl : LoadingController
              ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  onSignin(form : NgForm){
    console.log(form);
    const loading = this.loadingCtrl.create({
      content : 'Singin you in....'
    });
    loading.present();
    this.authService.signin(form.value.email, form.value.password)
      .then(data => {
        console.log(data);
        loading.dismiss();
      })
      .catch(error => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title : 'Signin Failded',
          message : error.message,
          buttons : ['Ok']
        });
        alert.present();
        console.log(error);
      });
  }
}
