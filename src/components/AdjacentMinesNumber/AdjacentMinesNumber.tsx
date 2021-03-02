import React from 'react';
import './styles.scss';

const colors = ['#0000fd', '#017e00', '#fd0000', '#010180', '#830003', '#008080', '#000000', '#808080'];

const AdjacentMinesNumber: React.FC<{number: number}> = ({ number }) => {
  const color = colors[number - 1];

  return (
    <div
      style={{color: color}}
      className="num">
      {number === 0 ? null : number}
    </div>
  )
};

export default AdjacentMinesNumber;