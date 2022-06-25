import React from 'react';
import styles from './styles.module.scss';

const TableHeaders = ({ headers }) => {
  return (
    <thead>
      <tr>
        {headers.map((headerValue, i) => (
          <th className={styles.sTh} key={`th_${headerValue}_${i}`}>
            {headerValue}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeaders;
