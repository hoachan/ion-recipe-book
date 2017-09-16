import { state } from '@angular/core';
import { SEARCH } from './../actions/book';
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

export const initialState : State = {
    ids : [],
    entities : {},
    selectedBookId : null
}

export function reducer(state = initialState, action : book.Actions) : State{
    switch(action.type){
        case book.ADD_BOOK : 
            return addBook(state, action.payload);
        case book.SELECT:
            return selectBook (state, action.payload);
        case book.SEARCH : 

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
    const newBookId = ++state.ids.length;
    return Object.assign({}, state, {
        ids : [...state.ids, newBookId],
        entities : {
            newBookId : book
        }
    });
}

export function selectBook(
    state : State,
    titleBook : String
){
    return Object.assign({}, state);
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


export const getAll = createSelector(getEntites, getIds, 
        (entites, ids) => ids.map(id => entites[id]));