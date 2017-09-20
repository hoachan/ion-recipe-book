import { getBooks } from './../../reducers/book';
import { getEntitesBook } from './../../reducers/index';
import { AuthService } from './../../services/auth';
import { BookService } from './../../services/book';
import { Component, OnInit } from '@angular/core';
import { IonicPage,  NavController,  NavParams,  LoadingController,  AlertController} from 'ionic-angular';

import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import {Store} from "@ngrx/store";
/** Rxjs import */
import {Observable} from "rxjs";
// import 'rxjs/add/operator/let';
/** Rxjs import */
import { Book } from './../../models/book';

import * as fromRoot from '../../reducers';


import * as bookAction from '../../actions/book';

@IonicPage()
@Component({
  selector: 'page-book',
  templateUrl: 'book.html',
})
export class BookPage implements OnInit{

  bookIds$    : Observable<string[]>;
  books$      : Observable<Book[]>;


  bookForm : FormGroup;

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public loadingCtrl : LoadingController,
      private authService : AuthService,
      private bookService : BookService,
      private alertCtrl : AlertController,
      private store: Store<any>
    ) {
      this.bookIds$ = this.store.select(fromRoot.getBookIds);
      this.books$   = this.store.select(fromRoot.getEntitesBook);
  }

  initializeForm(){
    let bookId      : string = "";
    let titleBook   : string = "";
    let description : string = "";

    this.bookForm = new FormGroup({
      'bookId'        : new FormControl(bookId, Validators.required),
      'titleBook'     : new FormControl(titleBook, Validators.required),
      'description'   : new FormControl(description, Validators.required)  
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookPage');
  }

  ngOnInit() {
    this.initializeForm();
  }
  onSubmit(){
    // console.log(this.bookForm);
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    const value = this.bookForm.value;

    let newBook : Book = {
      id : value.bookId,
      volumeInfo : {
          title : value.titleBook,
          author : ['andy chan', 'lady gaga'],
          description : value.description,
          publishDate : '2017/09/15',
          ratingCount : 2
      }
    }

    this.store.dispatch(new bookAction.AddBookAction(newBook));

    this.bookForm.reset();
    this.getAllBook();

    loading.dismiss();


  }

  getAllBook(){

    this.bookIds$.subscribe(en => console.log(en));
    this.books$.subscribe(books => {
      console.log(books);
      this.saveToServer(books);
    });

  }

  saveToServer(books : Book[]){
    if (!books) 
      return;
    
    /** Oauth through FireBase */
    this.authService.getActiveUser().getToken()
      .then(
        (token : string) => {
          this.bookService.saveBooksList(books, token)
            .subscribe(
              () => console.log('success'),
              error => {
                console.log('there is error has content : ' + error);
                this.handleError(error.json().error);
              }
            )
        },
        error => {
          console.log('There is error has content : ' + error);
          // this.handleError(error.json().error);
        }
      );
  }

  public handleError (errorMessage :  string){

    const alert =  this.alertCtrl.create({
      title : 'have a error',
      message : errorMessage,
      buttons : ['OK']
    })

    alert.present();
  }
}
