import { LoadSuccessAction } from './../actions/book';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';

import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { empty } from 'rxjs/observable/empty';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { of } from 'rxjs/observable/of';

import * as bookAction from '../actions/book';
import { BookService } from './../services/book';

@Injectable()
export class BookEffects {

    constructor (
        private actions$: Actions, private bookService : BookService
    ){}

    @Effect()
    fetchBooks$ : Observable<Action> = this.actions$
        .ofType(bookAction.LOAD)
        // .debounceTime(300)
        .map(toPayload)
        .switchMap(token => {
            if (token === '') {
                return empty();
            }

            return this.bookService.fetchBookList(token)
                    .map(books => new bookAction.LoadSuccessAction(books))
                    .catch( () => of (new bookAction.LoadSuccessAction([])));
        })
}