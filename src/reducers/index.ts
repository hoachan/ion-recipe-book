/*
  Import createSelector from reselect to make selection of different parts of the state fast efficient
 */
import { createSelector } from 'reselect';
/*
  Import the store logger to log all the actions to the console
 */
import {storeLogger} from "ngrx-store-logger";

/*
 Import the layout state
 */

import * as fromBook from './book';

import {compose} from "@ngrx/core";
import {combineReducers, State} from "@ngrx/store";

import { ActionReducer } from '@ngrx/store';

export interface AppState {
    Store : {
      books : fromBook.State
    }
}

const reducers = {
    books : fromBook.reducer
}

const developmentReducer:ActionReducer<AppState>  = compose(storeLogger(), combineReducers)(reducers);


export function reducer(state: any, action: any) {
  return developmentReducer(state, action);
}

/**
 * get Data from AppState and Reducer 
 */

export const getBookState = (state : AppState) => state.Store.books;

export const getEntitesBook = createSelector(getBookState, fromBook.getBooks);
export const getBookIds = createSelector(getBookState, fromBook.getIds);