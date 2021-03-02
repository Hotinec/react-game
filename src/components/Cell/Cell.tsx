import React from 'react';
import { useTypedSelector } from '../../redux/useTypedSelector';
import { useDispatch } from 'react-redux';
import { Cell as GameCell } from '../../constants';
import { Coords } from '../../constants';
import { flagOnCell, openCell, setUp } from '../../redux/actions/game';
import { addFlag, removeFlag } from '../../redux/actions/view';
import AdjacentMinesNumber from '../AdjacentMinesNumber';
import clickSound from '../../assets/audio/click.wav';
import './styles.scss';

interface Props {
  cell: GameCell;
  coords: Coords;
}

const Cell: React.FC<Props> = ({ cell, coords }) => {
  const dispatch = useDispatch();
  const mines = useTypedSelector((state) => state.view.mines);
  const status = useTypedSelector((state) => state.game.status);

  const handleClick = () => {
    if (status === 'win' || status === 'lose') return;

    const clickAudio = new Audio(clickSound);
    clickAudio.play();

    if (status === 'start') {
      dispatch(setUp(coords));
    }

    dispatch(openCell(coords));
  }
  
  const handleFlag = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (status === 'win' || status === 'lose') return;

    if (mines === 0 && !cell.isFlag) return;

    if (cell.isFlag) {
      dispatch(removeFlag());
    } else {
      dispatch(addFlag());
    }

    dispatch(flagOnCell(coords));
  };

  if (cell.isOpen) {
    return (
      <div
        className="cell cell--open"
        style={cell.isMine ? {backgroundColor: 'red'} : {backgroundColor: 'lightgray'}}
      >
        {cell.isMine ? '💣': <AdjacentMinesNumber number={cell.adjacentMines} />}
      </div>
    );
  }

  if (status === 'lose') {
    if (cell.isMine && !cell.isFlag) {
      return (
        <div className="cell cell--open">{'💣'}</div>
      );
    }

    if (cell.isMine && cell.isFlag) {
      return (
        <div
          className="cell cell--open"
          style={{backgroundColor: 'green'}}
        >{'🚩'}</div>
      );
    }
  }
  
  return (
    <div
      className="cell"
      onClick={handleClick}
      onContextMenu={handleFlag}
    >
      {cell.isFlag && '🚩'}
    </div>
  );
}

export default Cell;
