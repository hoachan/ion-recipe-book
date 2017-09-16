import { Book } from './../models/book';
import { AuthService } from './auth';
import { Injectable } from "@angular/core";
import { Response, Http} from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/Rx';

@Injectable()
export class BookService {
    constructor (private http : Http){}

    // addBook( book : Book) : Observable<Book[]> {
    //     // return

    // }
}