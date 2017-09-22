import { state } from '@angular/core';
import { SEARCH, LOADSUCCESS } from './../actions/book';
import { Book } from './../models/book';
import { createSelector } from 'reselect';
import * as book from '../actions/book';

export interface State  {
    ids: string[];
    entities : {
        [id : string] : Book
    };
    selectedBookId : string | null;
}

const initialState : State = {
    ids : [],
    entities : {},
    selectedBookId : null
}

export function reducer(state = initialState, action : book.Actions) : State{
    switch(action.type){
        case book.ADD_BOOK : 
            return addBook(state, action.payload);
        case book.SELECT:
            return selectBook (state, action.payload)
        case book.LOADSUCCESS:
            return loadSuccess(state, action.payload);
        case book.SEARCH:
        case book.LOAD :
        default : {
            return state;
        }
    }
}

/**
 * setting function following reducer action
 */
export function addBook(
    state : State,
    book : Book
){
    return Object.assign({}, state, {
        ids : [...state.ids, book.id],
        entities : Object.assign({}, state.entities, {
            [book.id] : book
        }),
        selectedBookId : book.id
    });
}

export function selectBook(
    state : State,
    titleBook : String
){
    return Object.assign({}, state);
}


export function loadSuccess(state : State, books : Book[]){
    const newBooks = books.filter(book => typeof book == "object" && book !== null);
    const bookIds = newBooks.map((book : Book) => book.id);
    const newBookEntities = newBooks.reduce(
                                (entities : { [id : string] : Book}, book: Book) => {
                                  return Object.assign(entities, {[book.id]: book});  
                                }, {}                                  
                            );

    return {
        ids : [...state.ids, ...bookIds],
        entities : Object.assign({}, state.entities, newBookEntities),
        selectedBookId : state.selectedBookId
    };
}
/** ---end setting function for reducer action */

/**
 * Because the data structure is defined within the reducer it is optimal to
 * locate our selector functions at this level. If store is to be thought of
 * as a database, and reducers the tables, selectors can be considered the
 * queries into said database. Remember to keep your selectors small and
 * focused so they can be combined and composed to fit each particular
 * use-case.
 */

export const getIds = (state : State) => state.ids;

export const getEntites = (state : State) => state.entities;

export const getSelectedId = (state : State) => state.selectedBookId;

export const getSelected = createSelector(getEntites, getSelectedId,
     (entites, selectedId) => entites[selectedId]);


export const getBooks = createSelector(getEntites, getIds, 
        (entites, ids) => ids.map(id => entites[id]));