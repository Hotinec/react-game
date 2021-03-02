import React from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../redux/useTypedSelector';
import { newGame } from '../../redux/actions/game';
import { setMines } from '../../redux/actions/view';
import smile from '../../assets/images/smile.png';
import sad from '../../assets/images/unsmile.png';
import './styles.scss';

const StartButton: React.FC = () => {
  const dispatch = useDispatch();
  const hardlevel = useTypedSelector((state) => state.game.level);
  const status = useTypedSelector((state) => state.game.status);

  const handleClick = () => {
    dispatch(newGame());
    dispatch(setMines(hardlevel.mines));
  }

  return (
    <button className="start-button" onClick={() => handleClick()}>
      <img src={status === 'lose' ? sad : smile} alt="face"  className="start-button__img" />
    </button>
  );
}

export default StartButton;
