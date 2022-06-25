import React, { useEffect, useState, FC } from 'react';

import 'react-datepicker/dist/react-datepicker.css';
import styles from './DatePicker.module.scss';
import cn from 'classnames';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import { UseFormRegister } from 'react-hook-form';
import Input from '@components/shared/Input';
import { format } from 'date-fns';

interface IDatePicker {
  error?: boolean;
  isRange?: boolean;
  onChange: any;
  register?: UseFormRegister<any>;
  path?: string;
  placeholderText?: string | undefined;
}

const DEFAULT_DATE_FORMAT = 'yyyy-MM-dd';

export const DatePicker: FC<ReactDatePickerProps & IDatePicker> = ({
  maxDate,
  dateFormat,
  disabled,
  startDate: startDateDefault,
  endDate: endDateDefault,
  className,
  isRange,
  onChange,
  error,
  filterDate,
  dropdownMode,
  register,
  path,
  placeholderText,
  ...props
}) => {
  const [startDate, setStartDate] = useState<Date | null | undefined>(
    startDateDefault
  );
  const [endDate, setEndDate] = useState<Date | null | undefined>(
    endDateDefault
  );

  useEffect(() => {
    setStartDate(startDateDefault);
    setEndDate(endDateDefault);
  }, [startDateDefault, endDateDefault]);

  const handleChange = (
    date: Date | null | [Date | null, Date | null],
    event: React.SyntheticEvent<any> | undefined
  ) => {
    if (Array.isArray(date)) {
      const [startDate, endDate] = date;
      setStartDate(startDate);
      setEndDate(endDate);
    }

    onChange(date, event);
  };

  const classnames: string = cn(styles.input, className);

  return (
    <div className={styles.dateWrapper}>
      <ReactDatePicker
        className={classnames}
        onChange={handleChange}
        selectsRange={isRange}
        startDate={startDate}
        endDate={endDate}
        placeholderText={placeholderText}
        {...props}
      />
      {register && path && startDate && (
        <Input
          value={format(startDate, DEFAULT_DATE_FORMAT)}
          style={{ display: 'none' }}
          {...register(`${path}:dateFrom`)}
        />
      )}
      {register && path && endDate && (
        <Input
          value={format(endDate, DEFAULT_DATE_FORMAT)}
          style={{ display: 'none' }}
          {...register(`${path}:dateTo`)}
        />
      )}
    </div>
  );
};
