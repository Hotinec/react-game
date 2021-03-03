import React from 'react';
import { useTypedSelector } from '../../redux/useTypedSelector';
import Cell from '../Cell';
import './styles.scss';

const Board: React.FC = () => {
  const board = useTypedSelector((state) => state.game.board);
  return (
    <div className="board">
      {
        board.map((row, y) => (
          <div className="row" key={row[0].id}>
            {
              row.map((cell, x) => (
                <Cell key={cell.id} cell={cell} coords={{x, y}}/>
              ))
            }
          </div>
        ))
      }
    </div>
  )
}

export default Board;
