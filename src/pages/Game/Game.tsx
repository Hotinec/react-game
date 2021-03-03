/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect} from 'react';
import { useTypedSelector } from '../../redux/useTypedSelector';
import { useDispatch } from 'react-redux';
import { setState as setGameState, newGame } from '../../redux/actions/game';
import { setState as setViewState, setMines } from '../../redux/actions/view';
import { BoardState, IViewState } from '../../constants';
import Header from '../../components/Header';
import Board from '../../components/Board';
import Footer from '../../components/Footer';
import Volume from '../../components/Volume';
import { get, set } from '../../sevices/storageService';
import winSound from '../../assets/audio/success.mp3';
import loseSound from '../../assets/audio/sad.mp3';
import logo from '../../assets/images/rs_school_js_logo.svg';
import git from '../../assets/images/GitHub-Mark-64px.png';
import './styles.scss';

const Game: React.FC = () => {
  const dispatch = useDispatch();
  const status = useTypedSelector((state) => state.game.status);
  const time = useTypedSelector((state) => state.view.time);
  const hardlevel = useTypedSelector((state) => state.game.level);

  const saveResult = (status: string) => {
    let results = get('results');
    if (!results) results = [];

    results.push({
      date: new Date(),
      status: status,
      time: time,
    });

    set('results', results);
  }

  useEffect(() => {
    let audio: HTMLAudioElement;
    if (status === 'win') {
      audio = new Audio(winSound);
      audio.play();

      saveResult('win');

      return () => {audio.muted = true};
    } else if (status === 'lose') {
      audio = new Audio(loseSound);
      audio.play();

      saveResult('lose');

      return () => {audio.muted = true};
    }
  }, [status]);

  useEffect(() => {
    const gameState: BoardState = get('game');
    const viewState: IViewState = get('view');

    if (gameState && viewState) {
      dispatch(setGameState(gameState));
      dispatch(setViewState(viewState));
    } else {
      dispatch(newGame());
      dispatch(setMines(hardlevel.mines));
    }
  }, []);

  return (
    <div className="game">
      <Header />
      <Board />
      <Footer />
      <div className="game__controls">
        <a href="https://rs.school/react/" className="game__controls-link">
          <img src={logo} className="logo" alt="logo"/>
        </a>
        <ul className="game__controls-icons">
          <li className="game__controls-item">
            <a href="https://github.com/Hotinec">
              <img src={git} alt="github" className="git"/>
            </a>
          </li>
          <li className="game__controls-item">
            <Volume />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Game;
