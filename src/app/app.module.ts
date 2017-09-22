import { BookPage } from './../pages/book/book';
import { SlOptionsPage } from './../pages/shoping-list/sl-options/sl-options';
import { AuthService } from './../services/auth';
import { SignupPage } from './../pages/signup/signup';
import { SigninPage } from './../pages/signin/signin';
import { RecipesService } from './../services/recipes';
import { ShoppingListService } from './../services/shoping-list';
import { BookService } from './../services/book';
import { NgForm } from '@angular/forms';
import { TabsPage } from './../pages/tabs/tabs';
import { ShopingListPage } from './../pages/shoping-list/shoping-list';
import { RecipesPage } from './../pages/recipes/recipes';
import { RecipePage } from './../pages/recipe/recipe';
import { EditRecipePage } from './../pages/edit-recipe/edit-recipe';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http'; 

import { MyApp } from './app.component';

/**
 * import store for redux system
 */
import { StoreModule } from '@ngrx/store';
// import {metaReducer} from "../common/index";
import { reducer } from '../reducers';
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BookEffects } from './../effects/book';
/**
 * finish setting for redux system
 */

@NgModule({
  declarations: [
    MyApp,
    EditRecipePage,
    RecipePage,
    RecipesPage,
    ShopingListPage,
    TabsPage,
    SigninPage,
    SignupPage,
    SlOptionsPage,
    BookPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    StoreModule.forRoot({ Store : reducer } ),

    EffectsModule.forRoot([BookEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25 //  Retains last 25 states
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EditRecipePage,
    RecipePage,
    RecipesPage,
    ShopingListPage,
    TabsPage,
    SigninPage,
    SignupPage,
    SlOptionsPage,
    BookPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ShoppingListService,
    RecipesService,
    AuthService,
    BookService,
  ]
})
export class AppModule {}
