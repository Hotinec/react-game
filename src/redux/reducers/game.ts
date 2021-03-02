import IAction from '../actions/IAction';
import { 
  createBoard,
  generateMines,
  countAdjacentCells,
  openCell,
  checkWin,
} from '../../sevices/gameSevice';
import { BOARD, BoardState } from '../../constants';
import { 
  CREATE_BOARD,
  FLAG_ON_CELL,
  NEW_GAME,
  SET_STATUS,
  SET_UP,
  OPEN_CELL,
  SET_GAME_STATE,
} from '../actions/game';

const initialState: BoardState = {
  status: 'start',
  board: createBoard(BOARD.EASY.size),
  level: BOARD.EASY,
}

const game = (state = initialState, action: IAction): BoardState => {
  let board;

  switch (action.type) {
    case CREATE_BOARD: 
      return {
        status: 'start',
        board: createBoard(action.payload.size),
        level: action.payload,
      };
    
    case FLAG_ON_CELL:
      const { x, y } = action.payload;
      board = [...state.board];
      board[y][x].isFlag = !board[y][x].isFlag;

      return {
        ...state,
        board: board,
      };

    case NEW_GAME:
      return {
        ...state,
        status: 'start',
        board: createBoard(state.level.size),
      };

    case SET_STATUS:
      return {
        ...state,
        status: action.payload
      };

    case SET_UP:
      board = [...state.board];
      generateMines(board, state.level, action.payload);
      countAdjacentCells(board);

      return { ...state, board, status: 'playing' }

    case OPEN_CELL:
      board = [...state.board];
      const success = openCell(board, action.payload);
      let status = state.status;

      if (!success) {
        status = 'lose';
      }

      if (checkWin(state.board, state.level)) {
        status = 'win';
      }

      return { ...state, status, board };

    case SET_GAME_STATE:
      return action.payload;
    
    default: return state;
  }
}

export default game;
