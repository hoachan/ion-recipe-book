import { empty } from 'rxjs/observable/empty';
import { Book } from './../models/book';
import { AuthService } from './auth';
import { Injectable, OnInit } from "@angular/core";
import { Response, Http} from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/Rx';

@Injectable()
export class BookService {

    private URL         = 'https://ionic-d22eb.firebaseio.com/';
    private userToken : string;

    constructor (
        private http : Http,
        private authService : AuthService
    ){
    }

    public saveBooksList( books : Book[], token) {
        const userId = this.authService.getActiveUser().uid;
        console.log(userId);

        return this.http.put(this.URL + userId + 'BookList.json?auth='
                + token, books)
                .map((response : Response) => response.json);
    }

    public fetchBookList(token : string){
        const userId = this.authService.getActiveUser().uid;

        return this.http.get(this.URL + userId +  'BookList.json?auth=' + token)
                .map((response : Response) => response.json())
    }
}