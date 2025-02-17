import React from 'react';

import { columnNames } from './consts';

import './styles.scss';

export const ScoresBoardHeader = () => {
  return (
    <tr className="scores-board-header">
      {columnNames.map((column, index) => {
        return <th key={`header-${index}`} className={`scores-board-header`}>{column}</th>
      })
      }
    </tr>
  );
};

export default ScoresBoardHeader;

