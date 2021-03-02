import IAction from './IAction';
import { Coords, IBoard, GameStatus, BoardState } from '../../constants';

export const CREATE_BOARD = 'CREATE_BOARD';
export const FLAG_ON_CELL = 'FLAG_ON_CELL';
export const NEW_GAME = 'NEW_GAME';
export const SET_STATUS = 'SET_STATUS';
export const SET_UP = 'SET_UP';
export const OPEN_CELL = 'OPEN_CELL';
export const SET_FLAG = 'SET_FLAG';
export const SET_GAME_STATE = 'SET_GAME_STATE';

export const createBoard = (payload: IBoard): IAction => ({
  type: CREATE_BOARD,
  payload,
});

export const flagOnCell = (payload: Coords): IAction => ({
  type: FLAG_ON_CELL,
  payload,
});

export const newGame = (): IAction => ({
  type: NEW_GAME,
});

export const setStatus = (payload: GameStatus): IAction => ({
  type: SET_STATUS,
  payload,
});

export const setUp = (payload: Coords): IAction => ({
  type: SET_UP,
  payload,
});

export  const openCell = (payload: Coords): IAction => ({
  type: OPEN_CELL,
  payload,
});

export const setState = (payload: BoardState): IAction => ({
  type: SET_GAME_STATE,
  payload,
})
