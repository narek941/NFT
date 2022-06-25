import { IFilterBadge } from '@components/BuyFilterBlock/BuyFilterBlock';
import AccordionItem from '@components/shared/Accordion/AccordionItem';
import { DatePicker } from '@components/shared/DatePicker';
import { filtersUpdate } from '@entities/filters/redux/actions';
import { useTypedSelector } from '@hooks/useNewTypedSelector';
import { useNoInitialEffect } from '@hooks/useNoInitialEffect';
import { format } from 'date-fns';
import React, {
  ForwardedRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { DATEFNS_FORMATS } from 'src/common/utils/dateTime';
import styles from './DateFilter.module.scss';
import classNames from 'classnames';

interface IDateField {
  header: string;
  size?: 's' | 'm' | 'l';
  color?: 'primary' | 'default';
  setBadges: Function;
  fromDate?: string;
  toDate?: string;
  propName: string;
  filterPropFrom: string;
  filterPropTo: string;
  placeholderText?: string;
}

const DateFilter = forwardRef(
  (
    {
      header,
      color,
      size,
      setBadges,
      fromDate,
      toDate,
      propName,
      filterPropFrom,
      filterPropTo,
      placeholderText,
    }: IDateField,
    ref: ForwardedRef<unknown>
  ) => {
    const dispatch = useDispatch();
    let startDateDefault: Date | null = null;
    let endDateDefault: Date | null = null;
    if (fromDate) {
      startDateDefault = new Date(fromDate);
    }
    if (toDate) {
      endDateDefault = new Date(toDate);
    }
    const [startDate, setStartDate] = useState<Date | null>(startDateDefault);
    const [endDate, setEndDate] = useState<Date | null>(endDateDefault);

    useImperativeHandle(ref, () => ({
      clear() {
        setStartDate(null);
        setEndDate(null);
      },
    }));

    useEffect(() => {
      if (startDateDefault && endDateDefault) {
        const badge = {
          value: `${format(startDateDefault, DATEFNS_FORMATS.DATE)} - ${format(
            endDateDefault,
            DATEFNS_FORMATS.DATE
          )}`,
          field: propName,
          onRemove: () => {
            setStartDate(null);
            setEndDate(null);
            setBadges((prev: IFilterBadge[]) =>
              prev.filter((item) => item.field !== propName)
            );
            dispatch(
              filtersUpdate({
                page: 1,
                [filterPropFrom]: null,
                [filterPropTo]: null,
              })
            );
          },
        };
        setBadges((prev: IFilterBadge[]) => [...prev, badge]);
      }
    }, []);

    useNoInitialEffect(() => {
      if ((startDate && endDate) || (!startDate && !endDate)) {
        dispatch(
          filtersUpdate({
            page: 1,
            [filterPropFrom]: startDate
              ? format(startDate, DATEFNS_FORMATS.DATE)
              : null,
            [filterPropTo]: endDate
              ? format(endDate, DATEFNS_FORMATS.DATE)
              : null,
          })
        );
        if (startDate && endDate) {
          const badge = {
            value: `${format(startDate, DATEFNS_FORMATS.DATE)} - ${format(
              endDate,
              DATEFNS_FORMATS.DATE
            )}`,
            field: propName,
            onRemove: () => {
              setStartDate(null);
              setEndDate(null);
              setBadges((prev: IFilterBadge[]) =>
                prev.filter((item) => item.field !== propName)
              );
              dispatch(
                filtersUpdate({
                  page: 1,
                  [filterPropFrom]: null,
                  [filterPropTo]: null,
                })
              );
            },
          };
          setBadges((prev: IFilterBadge[]) => {
            const cleared = prev.filter((item) => item.field !== propName);
            return [...cleared, badge];
          });
        } else {
          setBadges((prev: IFilterBadge[]) =>
            prev.filter((item) => item.field !== propName)
          );
          dispatch(
            filtersUpdate({
              page: 1,
              [filterPropFrom]: null,
              [filterPropTo]: null,
            })
          );
        }
      }
    }, [startDate, endDate]);

    return (
      <div className={styles.datePickerWrapper}>
        <AccordionItem
          title={header}
          defaultOpen
          size={size}
          color={color}
          className={classNames(
            styles['datePicker-accordion'],
            styles['subAccordion']
          )}
        >
          <DatePicker
            isClearable
            placeholderText={placeholderText}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            isRange
            onChange={(date) => {
              if (Array.isArray(date)) {
                const [startDate, endDate] = date;
                setStartDate(startDate);
                setEndDate(endDate);
              }
            }}
            startDate={startDate}
            endDate={endDate}
            dropdownMode='select'
          />
        </AccordionItem>
      </div>
    );
  }
);

export default DateFilter;
