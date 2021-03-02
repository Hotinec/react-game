/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect} from 'react';
import { useTypedSelector } from '../../redux/useTypedSelector';
import { useDispatch } from 'react-redux';
import { setState as setGameState } from '../../redux/actions/game';
import { setState as setViewState } from '../../redux/actions/view';
import { BoardState, IViewState } from '../../constants';
import Header from '../../components/Header';
import Board from '../../components/Board';
import Footer from '../../components/Footer';
import Volume from '../../components/Volume';
import { get, set } from '../../sevices/storageService';
import winSound from '../../assets/audio/success.mp3';
import loseSound from '../../assets/audio/sad.mp3';
import logo from '../../assets/images/rs_school_js_logo.svg';
import './styles.scss';

const Game: React.FC = () => {
  const dispatch = useDispatch();
  const status = useTypedSelector((state) => state.game.status);
  const time = useTypedSelector((state) => state.view.time);

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
    }
  }, []);

  return (
    <div className="game">
      <Header />
      <Board />
      <Footer />
      <div className="game__logo-volume">
        <a href=""><img src={logo} className="logo" alt="logo"/></a>
        <Volume />
      </div>
    </div>
  );
}

export default Game;
