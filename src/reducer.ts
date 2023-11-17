import React from "react";
import { ElementData, ElementDataList } from "./model";
import { combineReducers } from "redux";

export type Action =
  | { type: 'delete', payload: number }
  | { type: 'select', payload: number }
  | { type: 'filter', payload: string }
  | { type: 'save', payload: ElementData }
  | { type: 'init', payload: ElementDataList }
  | { type: 'sort' }

export interface State {
  elements: ElementDataList,
  selected: ElementData | null,
  sortType: any,
}

export const sortTypes = {
  up: {
    text: '↑',
    fn: (a: ElementData, b: ElementData) => b.position - a.position
  },
  down: {
    text: '↓',
    fn: (a: ElementData, b: ElementData) => a.position - b.position
  }
};

export const defaultState: State = {
  elements: [],
  selected: null,
  sortType: sortTypes.down,
}

export function elementsReducer(state: State = defaultState, action: Action): State {
  switch (action.type) {
    case 'delete':
      let position = action.payload
      let lessElements = state.elements.filter(el => el.position !== position)
      return {
        ...state,
        elements: [...lessElements]
      }

    case 'init':
      let elements = action.payload
      return {
        ...state,
        elements: [...elements]
      }

    case 'sort':
      let currentSortType = state.sortType
      let nextSortType = currentSortType === sortTypes.up ? sortTypes.down : sortTypes.up
      return {
        ...state,
        sortType: nextSortType
      }

    default:
      return state;
  }
}

export default combineReducers(
  {
    elementsReducer,
    // other reducer
  }
)