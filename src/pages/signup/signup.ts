import { AuthService } from './../../services/auth';
import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(
              public navCtrl: NavController, 
              public navParams: NavParams,
              private authService : AuthService  
            ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  onSignup(form : NgForm){
    console.log(form);
    this.authService.signup(form.value.email, form.value.password).then(data => console.log(data)).catch(error => console.log(error));
  }
}
