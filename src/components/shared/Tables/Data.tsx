import { IHeadersData } from './types';
export const headersData = (data): IHeadersData[] => [
  {
    headerValue: '#',
    rowValue: data.id,
  },
  {
    headerValue: 'Bid',
    rowValue: data.bid,
  },
  {
    headerValue: 'By',
    rowValue: data.user,
  },
  {
    headerValue: 'Date',
    rowValue: data.date,
  },
];
export const tableData = (data): IHeadersData[] => [
  {
    rowValue: data.title,
  },
  {
    rowValue: data.desc,
  },
  {
    rowValue: data.other,
  },
];
