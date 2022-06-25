import React, { FC, ChangeEvent, useEffect } from 'react';
import {
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

import Input from '@components/shared/Input';
import styles from './TraitInt.module.scss';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { filtersUpdate } from '@entities/filters/redux/actions';
import {
  IBuyFilterForm,
  IFilterBadge,
} from '@components/BuyFilterBlock/BuyFilterBlock';
import { useTypedSelector } from '@hooks/useNewTypedSelector';
import { uuid } from 'uuidv4';
import { ITrait } from '@type/ICollection';
import { getBracketField, getBracketsValue } from '../BuyFilterBlock.helper';
import { getValueByPath } from 'src/common/utils/getValueByPath';

interface ITraitInt {
  trait: ITrait;
  register: UseFormRegister<IBuyFilterForm>;
  setValue: UseFormSetValue<IBuyFilterForm>;
  getValues: UseFormGetValues<IBuyFilterForm>;
  setBadges: Function;
  path: string;
  className?: string;
}

export const TraitInt: FC<ITraitInt> = ({
  register,
  getValues,
  setValue,
  trait,
  setBadges,
  path,
  className,
}) => {
  const { traits } = useTypedSelector((state) => state.filter);
  const dispatch = useDispatch();

  const field = trait.description;

  const formValues = getValues();

  const addTraitField = (field: string, value: number | string) => {
    const traitsArray = traits ? traits.split(',') : [];
    const existingValueInd = traitsArray.findIndex((item) =>
      item.includes(field)
    );
    if (existingValueInd !== -1) {
      traitsArray.splice(existingValueInd, 1, `${field}(${value})`);
    } else {
      traitsArray.push(`${field}(${value})`);
    }

    return traitsArray.join(',');
  };

  const removeTraitField = (field: string) => {
    const traitsArray = traits ? traits.split(',') : [];
    const existingValueInd = traitsArray.findIndex((item) =>
      item.includes(field)
    );
    if (existingValueInd !== -1) {
      traitsArray.splice(existingValueInd, 1);
    }

    return traitsArray.length ? traitsArray.join(',') : null;
  };

  const onRemoveBadge = (field: string) => {
    setBadges((prev: IFilterBadge[]) =>
      prev.filter((item) => item.field !== field)
    );
    setValue(field, null);
    const newTraits = removeTraitField(field);
    dispatch(filtersUpdate({ page: 1, traits: newTraits }));
  };

  const initField = (str: string) => {
    const value = getBracketsValue(str);
    const field = getBracketField(str);
    setValue(field, value);
    const badge = {
      value: `${field}(${value})`,
      field,
      onRemove: () => onRemoveBadge(field),
    };
    setBadges((prev: IFilterBadge[]) => {
      return prev.filter((item) => item.field !== field).concat([badge]);
    });
  };

  useEffect(() => {
    if (traits) {
      const traitArray = traits.split(',');
      const fieldFrom = traitArray.find((item) =>
        item.includes(`${field}:intFrom`)
      );
      const fieldTo = traitArray.find((item) =>
        item.includes(`${field}:intTo`)
      );
      if (fieldFrom) {
        initField(fieldFrom);
      }
      if (fieldTo) {
        initField(fieldTo);
      }
    }
  }, []);

  const handleBlur = (
    e: ChangeEvent<HTMLInputElement>,
    field: string,
    rootField: string
  ) => {
    const formValues = getValues();

    let numValue: string | number = e.target.value;
    if (numValue) {
      if (
        field === `${rootField}:intFrom` &&
        formValues[`${rootField}:intTo`]
      ) {
        if (Number(numValue) > Number(formValues[`${rootField}:intTo`])) {
          numValue = formValues[`${rootField}:intTo`];
          setValue(`${rootField}:intFrom`, numValue);
        }
      }
      if (
        field === `${rootField}:intTo` &&
        formValues[`${rootField}:intFrom`]
      ) {
        if (Number(numValue) < Number(formValues[`${rootField}:intFrom`])) {
          numValue = formValues[`${rootField}:intFrom`];
          setValue(`${rootField}:intTo`, numValue);
        }
      }
      const badge = {
        value: `${field}(${numValue})`,
        field,
        onRemove: () => onRemoveBadge(field),
      };
      setBadges((prev: IFilterBadge[]) => {
        return prev.filter((item) => item.field !== field).concat([badge]);
      });
      const newTraits = addTraitField(field, numValue);
      dispatch(filtersUpdate({ page: 1, traits: newTraits }));
    } else {
      setBadges((prev: IFilterBadge[]) =>
        prev.filter((item) => item.field !== field)
      );
      const newTraits = removeTraitField(field);
      dispatch(filtersUpdate({ page: 1, traits: newTraits }));
    }
  };
  return (
    <div className={classNames(styles['trait-container'], className)}>
      <div className={styles.title}>{trait.description}</div>
      <div className={styles.wrapper}>
        <Input
          className={styles['input-price']}
          size='s'
          id={uuid()}
          placeholder='Min'
          {...register(`${path}.${field}:intFrom`)}
          type='number'
          onBlur={(e: ChangeEvent<HTMLInputElement>) =>
            handleBlur(e, `${field}:intFrom`, `${path}.${field}`)
          }
          max={getValueByPath(formValues, `${path}.${field}:intTo`)}
        />
        <div className={styles.valueTo}>to</div>
        <Input
          className={styles['input-price']}
          size='s'
          id={uuid()}
          placeholder='Max'
          {...register(`${path}.${field}:intTo`)}
          type='number'
          onBlur={(e: ChangeEvent<HTMLInputElement>) =>
            handleBlur(e, `${field}:intTo`, `${path}.${field}`)
          }
          min={getValueByPath(formValues, `${path}.${field}:intFrom`)}
        />
      </div>
    </div>
  );
};
