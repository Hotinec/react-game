import IAction from './IAction';
import { IViewState } from '../../constants';

export const SET_MINES = 'SET_MINES';
export const ADD_FLAG = 'ADD_FLAG';
export const REMOVE_FLAG = 'REMOVE_FLAG';
export const SET_VIEW_STATE = 'SET_VIEW_STATE';
export const SET_TIME = 'SET_TIME';

export const setMines = (payload: number): IAction => ({
  type: SET_MINES,
  payload,
});

export const addFlag = (): IAction => ({
  type: ADD_FLAG,
});

export const removeFlag = (): IAction => ({
  type: REMOVE_FLAG,
});

export const setState = (payload: IViewState): IAction => ({
  type: SET_VIEW_STATE,
  payload,
});

export const setTime = (payload: number): IAction => ({
  type: SET_TIME,
  payload,
});
