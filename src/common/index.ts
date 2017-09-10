import { AppState } from './index';
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

import * as fromLayout from "./layout/layout.reducer"

import {compose} from "@ngrx/core";
import {combineReducers, State} from "@ngrx/store";

import { ActionReducer } from '@ngrx/store';
// import {state} from "@angular/core";

export interface AppState {
  layout: fromLayout.State;
}

export const reducers = {
  layout: fromLayout.reducer,
};



const developmentReducer:ActionReducer<AppState>  = compose(storeLogger(), combineReducers)(reducers);


export function metaReducer(state: any, action: any) {
  return developmentReducer(state, action);
}


/**
 * Layout selectors
 */

export const getLayoutState = (state: AppState) => state.layout;

export const getLayoutOpenedModalName = createSelector(getLayoutState , fromLayout.getOpenedModalName);

export const getLayoutLeftSidenavState = createSelector(getLayoutState, fromLayout.getLeftSidenavState);

export const getLayoutRightSidenavState = createSelector(getLayoutState, fromLayout.getRightSidenavState);

export const getLayoutAlertsState = createSelector(getLayoutState, fromLayout.getAlerts);

