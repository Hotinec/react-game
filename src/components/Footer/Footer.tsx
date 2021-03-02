import React from 'react';
import { useHistory } from "react-router-dom";
import { useTypedSelector } from '../../redux/useTypedSelector';
import { useDispatch } from 'react-redux';
import { createBoard } from '../../redux/actions/game';
import { setMines } from '../../redux/actions/view';
import { BOARD } from '../../constants';
import { set } from '../../sevices/storageService';
import './styles.scss';

const Footer: React.FC<{dataTime: number}> = ({dataTime}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const gameState = useTypedSelector((state) => state.game);
  const viewState = useTypedSelector((state) => state.view);

  const clickHandler = (data: {size: number; mines: number}) => {
    dispatch(createBoard(data));
    dispatch(setMines(data.mines));
  }

  const saveState = () => {
    set('game', gameState);
    set('view', viewState);
    set('time', dataTime);
  };

  const statisticsClickHandler = () => {
    history.push('/statistics');
  }

  return (
    <div className="footer">
      <div className="footer__board-size">
        <button 
          className="footer__button"
          onClick={() => clickHandler(BOARD.EASY)}>Easy</button>
        <button
          className="footer__button"
          onClick={() => clickHandler(BOARD.MEDIUM)}>Medium</button>
        <button 
          className="footer__button"
          onClick={() => clickHandler(BOARD.HERO)}>Hero</button>
      </div>
        <div className="footer__controls">
        <button
          onClick = {() => saveState()}
          className="footer__button footer__button--controls">Save</button>
        <button
          onClick = {statisticsClickHandler}
          className="footer__button footer__button--controls">Statistics</button>
      </div>
    </div>
  );
}

export default Footer;
