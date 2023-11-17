import React from "react";
import { ElementData, ElementDataList } from "./model";

export type Action =
  | { type: 'delete', payload: number }
  | { type: 'select', payload: number }
  | { type: 'filter', payload: string }
  | { type: 'save', payload: ElementData }
  | { type: 'init', payload: ElementDataList }

export interface State {
  elements: ElementDataList,
  selected: ElementData | null
}

export const defaultState: State = {
  elements: [],
  selected: null,
}

export const DispatchContext = React.createContext<React.Dispatch<Action> | null>(null)

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

    default:
      return state;
  }
}
