import { BookPage } from './../pages/book/book';
import { AuthService } from './../services/auth';
import { SignupPage } from './../pages/signup/signup';
import { SigninPage } from './../pages/signin/signin';
import { TabsPage } from './../pages/tabs/tabs';
import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import firebase from 'firebase';

import {Observable} from "rxjs";
import {Store} from "@ngrx/store";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any   = TabsPage;
  signinPage      = SigninPage;
  signupPage      = SignupPage;
  bookPage        = BookPage;

  isAuthenticated = false;

  /**Using ViewChild instead of DI navController */
  @ViewChild('nav') nav: NavController;

  constructor(
              platform: Platform, 
              statusBar: StatusBar, 
              splashScreen: SplashScreen, 
              private menuCtrl : MenuController,
              private alertCtrl : AlertController, 
              private authService : AuthService,
            ) {

          firebase.initializeApp({
            apiKey: "AIzaSyCDbcDg1kgYt4MZBzfGD_YZHjGgaXGmL00",
            authDomain: "ionic-d22eb.firebaseapp.com",             
          });

          firebase.auth().onAuthStateChanged(user => {
            if (user) {
              this.isAuthenticated = true;
              this.rootPage = TabsPage;
            } else {
              this.isAuthenticated = false;
              this.rootPage = SigninPage;
            }
          });
          platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
          });
  }

  onLoad(page : any){
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  onLogout() {
    this.authService.logout();
    this.menuCtrl.close();
    this.nav.setRoot(SigninPage);
  }

  goBookStore(page :any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }
}

