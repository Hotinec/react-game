import React from 'react';
import { Link } from 'react-router-dom';
import TableItem from '../../components/TableItem';
import { get } from '../../sevices/storageService';
import { IResult } from '../../constants';
import './styles.scss';

const Statistics: React.FC = () => {
  let results = get('results');

  return (
    <>
      <Link to="/" className="statistics__link">Game</Link>
      <div className="statistics__table">
        <div className="table__header">
          <table cellPadding="0" cellSpacing="0">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="table__content">
          <table cellPadding="0" cellSpacing="0">
            <tbody>
              {!!results && results.map((result: IResult, i: number) =>
                <TableItem 
                  key={result.toString() + i} 
                  resultData={result} />)}
            </tbody>
          </table>
        </div>
      </div>
    </>
    
  )
}

export default Statistics;
