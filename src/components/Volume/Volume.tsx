/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import soundOn from '../../assets/images/sound.png';
import soundOff from '../../assets/images/no-sound.png';
import gameSound from '../../assets/audio/bensound-psychedelic.mp3';
import './styles.scss';

const Volume: React.FC = () => {
  const [sound, setSound] = useState(false);
  const [volume, setVolume] = useState(40);

  let gameAudio: HTMLAudioElement = new Audio(gameSound);

  useEffect(() => {
    if (sound) {
      gameAudio.loop = true;
      gameAudio.volume = volume / 100;
      gameAudio.play();
    }

    return () => {gameAudio.muted = true};
  }, [sound]);

  const onSoundHandler = () => {
    setSound((sound) => !sound);
  };

  return (
    <div className="volume">
      <img
        onClick={onSoundHandler}
        src={sound ? soundOn : soundOff}
        className="volume__icon"
        alt="sound" />
    </div>
  );
}

export default Volume;
