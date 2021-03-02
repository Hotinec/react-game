/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect} from 'react';
import { useTypedSelector } from '../../redux/useTypedSelector';
import { useDispatch } from 'react-redux';
import { setState as setGameState } from '../../redux/actions/game';
import { setState as setViewState } from '../../redux/actions/view';
import { BoardState, IViewState } from '../../constants';
import Header from '../../components/Header';
import Board from '../../components/Board';
import Footer from '../../components/Footer';
import { get, set } from '../../sevices/storageService';
import gameSound from '../../assets/audio/bensound-psychedelic.mp3';
import winSound from '../../assets/audio/success.mp3';
import loseSound from '../../assets/audio/sad.mp3';
import logo from '../../assets/images/rs_school_js_logo.svg';
import './styles.scss';

const Game: React.FC = () => {
  const dispatch = useDispatch();
  const status = useTypedSelector((state) => state.game.status);
  const [dataTime, setDataTime] = useState(0);

  const saveResult = (status: string) => {
    let results = get('results');
    if (!results) results = [];

    results.push({
      date: new Date(),
      status: status,
      time: dataTime,
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

    let audio: HTMLAudioElement = new Audio(gameSound);
    audio.loop = true;
    audio.volume = 0.4;
    audio.play();

    return () => {audio.muted = true};
  }, []);

  return (
    <div className="game">
      <Header setDataTime={setDataTime}/>
      <Board />
      <Footer dataTime={dataTime} />
      <img src={logo} className="logo" alt="logo"/>
    </div>
  );
}

export default Game;
