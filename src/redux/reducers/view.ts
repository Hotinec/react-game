import IAction from '../actions/IAction';
import {
  SET_MINES,
  ADD_FLAG,
  REMOVE_FLAG,
  SET_VIEW_STATE,
  SET_TIME
} from '../actions/view';
import { BOARD, IViewState } from '../../constants';

const initialState: IViewState = {
  mines: BOARD.EASY.mines,
  time: 0
};

const size = (state = initialState, action: IAction): IViewState => {
  switch (action.type) {
    case SET_MINES:
      return {
        ...state,
        mines: action.payload
      }

    case ADD_FLAG:
      return {
        ...state,
        mines: state.mines - 1
      }

    case REMOVE_FLAG:
      return {
        ...state,
        mines: state.mines + 1
      }

    case SET_TIME:
      return {
        ...state,
        time: action.payload,
      }

    case SET_VIEW_STATE:
      return action.payload;
      
    default: return state;
  }
}

export default size;
