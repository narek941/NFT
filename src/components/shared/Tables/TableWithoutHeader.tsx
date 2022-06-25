import React from 'react';
import { tableData } from './Data';

import styles from './table.module.scss';

export const TableWithoutHeader = ({ rowsTable }) => {
  return (
    <table className={styles.tableWrapper}>
      <tbody>
        {rowsTable.map((item) => {
          return (
            <tr key={item.id}>
              {tableData(item).map(({ headerValue, rowValue }, i) => {
                return (
                  <td className={styles.sTd} key={`${item.id}_${i}`}>
                    {rowValue}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
