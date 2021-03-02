import React from 'react';
import { IResult } from '../../constants';
import { formatDate } from '../../utils/';

const TableItem: React.FC<{resultData: IResult}> = ({resultData}) => {
  const statusColor = resultData.status === 'lose' ? 'lose' : 'win';

  return (
    <tr className={statusColor}>
      <td>{formatDate(resultData.date)}</td>
      <td>{resultData.time}</td>
      <td>{resultData.status}</td>
    </tr>
  );
}

export default TableItem;
