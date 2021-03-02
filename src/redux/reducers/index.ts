  
import { combineReducers } from 'redux'
import viewReducer from './view';
import gameReducer from './game';

const rootReducer = combineReducers({
  view: viewReducer,
  game: gameReducer,
});

export default rootReducer;
