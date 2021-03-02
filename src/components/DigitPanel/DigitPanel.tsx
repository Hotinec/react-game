import React from 'react';
import './styles.scss';

interface Props {
  data: number;
}

const  DigitPanel: React.FC<Props> = ({data}) => {
  return (
    <div className="panel">
      <div className="panel__substrate">888</div>
      <div className="panel__digit">{data}</div>
    </div>
  );
}

export default DigitPanel;
