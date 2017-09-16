import { Book } from './../models/book';
import { Action } from '@ngrx/store';

export const SEARCH                 = 'Search the book';
export const SEARCH_COMPLETE        = 'Search the book completely';
export const LOAD                   = 'Loading the book';
export const SELECT                 = 'Select the book';
export const ADD_BOOK               = 'Add the new book';

export class SearchAction implements Action {
    readonly type = SEARCH;
    constructor(public payload :string){}
}

export class LoadAction implements Action {
    readonly type = LOAD;
    constructor (public payload : Book){}
}

export class SelectAction implements Action {
    readonly type = SELECT;
    constructor (public payload : string){}
}

export class AddBookAction implements Action {
    readonly type = ADD_BOOK;
    constructor (public payload : Book){}
}

export type Actions = SearchAction | LoadAction |
                    SelectAction | AddBookAction;