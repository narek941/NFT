import { DatePicker } from '@components/shared/DatePicker';
import { filtersUpdate } from '@entities/filters/redux/actions';
import { useTypedSelector } from '@hooks/useNewTypedSelector';
import { useNoInitialEffect } from '@hooks/useNoInitialEffect';
import { ITrait } from '@type/ICollection';
import { format } from 'date-fns';
import { useState, FC } from 'react';
import { useEffect } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { DATEFNS_FORMATS } from 'src/common/utils/dateTime';
import { IFilterBadge } from '../BuyFilterBlock';
import { getBracketsValue } from '../BuyFilterBlock.helper';
import styles from './TraitDate.module.scss';
import classNames from 'classnames';

interface ITraitDate {
  trait: ITrait;
  setBadges: Function;
  path: string;
  register: UseFormRegister<any>;
  placeholderText?: string | undefined;
  className?: string;
}

export const TraitDate: FC<ITraitDate> = ({
  trait,
  setBadges,
  path,
  register,
  placeholderText,
  className,
}) => {
  const { traits } = useTypedSelector((state) => state.filter);
  const dispatch = useDispatch();
  const field = trait.description;

  let defaultStartDate: null | Date = null;
  let defaultEndDate: null | Date = null;

  if (traits) {
    const traitArray = traits.split(',');
    const fieldFrom = traitArray.find((item) =>
      item.includes(`${field}:dateFrom`)
    );
    const fieldTo = traitArray.find((item) => item.includes(`${field}:dateTo`));
    if (fieldFrom && fieldTo) {
      const valueFrom = getBracketsValue(fieldFrom);
      const valueTo = getBracketsValue(fieldTo);
      defaultStartDate = new Date(valueFrom);
      defaultEndDate = new Date(valueTo);
    }
  }

  const [startDate, setStartDate] = useState<Date | null>(defaultStartDate);
  const [endDate, setEndDate] = useState<Date | null>(defaultEndDate);

  const addTraitField = (field: string, startDate: Date, endDate: Date) => {
    const value = `${format(startDate, DATEFNS_FORMATS.DATE)} - ${format(
      endDate,
      DATEFNS_FORMATS.DATE
    )}`;
    const traitsArray = traits ? traits.split(',') : [];
    const existingValueFromInd = traitsArray.findIndex((item) =>
      item.includes(`${field}:dateFrom`)
    );
    const existingValueToInd = traitsArray.findIndex((item) =>
      item.includes(`${field}:dateTo`)
    );
    if (existingValueFromInd !== -1) {
      traitsArray.splice(
        existingValueFromInd,
        1,
        `${field}:dateFrom(${format(startDate, DATEFNS_FORMATS.DATE)})`
      );
    } else {
      traitsArray.push(
        `${field}:dateFrom(${format(startDate, DATEFNS_FORMATS.DATE)})`
      );
    }

    if (existingValueToInd !== -1) {
      traitsArray.splice(
        existingValueToInd,
        1,
        `${field}:dateTo(${format(endDate, DATEFNS_FORMATS.DATE)})`
      );
    } else {
      traitsArray.push(
        `${field}:dateTo(${format(endDate, DATEFNS_FORMATS.DATE)})`
      );
    }

    return traitsArray.join(',');
  };

  const removeTraitField = (field: string) => {
    const traitsArray = traits ? traits.split(',') : [];
    const existingFromInd = traitsArray.findIndex((item) =>
      item.includes(`${field}:dateFrom`)
    );
    if (existingFromInd !== -1) {
      traitsArray.splice(existingFromInd, 1);
    }

    const existingToInd = traitsArray.findIndex((item) =>
      item.includes(`${field}:dateTo`)
    );
    if (existingToInd !== -1) {
      traitsArray.splice(existingToInd, 1);
    }

    return traitsArray.length ? traitsArray.join(',') : null;
  };

  const onRemoveBadge = () => {
    setStartDate(null);
    setEndDate(null);
    setBadges((prev: IFilterBadge[]) =>
      prev.filter((item) => item.field !== field)
    );
    const newTraits = removeTraitField(field);
    dispatch(filtersUpdate({ page: 1, traits: newTraits }));
  };

  useEffect(() => {
    if (startDate && endDate) {
      const badge = {
        value: `${field}:${format(startDate, DATEFNS_FORMATS.DATE)} - ${format(
          endDate,
          DATEFNS_FORMATS.DATE
        )}`,
        field,
        onRemove: onRemoveBadge,
      };
      setBadges((prev: IFilterBadge[]) => {
        return prev.filter((item) => item.field !== field).concat([badge]);
      });
    }
  }, []);

  useNoInitialEffect(() => {
    if ((startDate && endDate) || (!startDate && !endDate)) {
      if (startDate && endDate) {
        const badge = {
          value: `${field}:${format(
            startDate,
            DATEFNS_FORMATS.DATE
          )} - ${format(endDate, DATEFNS_FORMATS.DATE)}`,
          field,
          onRemove: onRemoveBadge,
        };
        setBadges((prev: IFilterBadge[]) => {
          const cleared = prev.filter((item) => item.field !== field);
          return [...cleared, badge];
        });

        const newTraits = addTraitField(field, startDate, endDate);
        dispatch(
          filtersUpdate({
            page: 1,
            traits: newTraits,
          })
        );
      } else {
        setBadges((prev: IFilterBadge[]) =>
          prev.filter((item) => item.field !== field)
        );
        const newTraits = removeTraitField(field);
        dispatch(filtersUpdate({ page: 1, traits: newTraits }));
      }
    }
  }, [startDate, endDate]);

  return (
    <div className={classNames(styles.wrapper, className)}>
      <div className={styles.title}>{field}</div>
      <DatePicker
        isClearable
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
        register={register}
        path={path}
        placeholderText={placeholderText}
      />
    </div>
  );
};
