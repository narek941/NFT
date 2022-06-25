import React from 'react';
import { headersData } from './Data';
import TableHeaders from './TableComponent/TableHeaders';
import styles from './table.module.scss';

export const Table = ({ rowsTable }) => {
  const onlyHeaders = headersData(rowsTable[0]).map(
    ({ headerValue }) => headerValue
  );
  return (
    <table className={styles.tableWrapper}>
      <TableHeaders headers={onlyHeaders} />
      <tbody>
        {rowsTable.map((item) => {
          return (
            <tr key={item.id}>
              {headersData(item).map(({ headerValue, rowValue }, i) => {
                return (
                  <td
                    data-attribute={headerValue}
                    className={styles.sTd}
                    key={`${item.id}_${i}`}
                  >
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
