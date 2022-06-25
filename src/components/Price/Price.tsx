import React, { FC, ChangeEvent, Dispatch, useEffect } from 'react';
import { FieldError, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import AccordionItem from '@components/shared/Accordion/AccordionItem';
import Input from '@components/shared/Input';
import styles from './Price.module.scss';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { filtersUpdate } from '@entities/filters/redux/actions';
import {
  IBuyFilterForm,
  IFilterBadge,
} from '@components/BuyFilterBlock/BuyFilterBlock';
import { useTypedSelector } from '@hooks/useNewTypedSelector';
import { LOADIPHLPAPI } from 'dns';

type errorType = FieldError | null | undefined;
export interface IPrice {
  className?: string;
  header: string;
  error: any;
  name?: string;
  size?: 's' | 'm' | 'l';
  color?: 'primary' | 'default';
  register: UseFormRegister<any>;
  formValues: IBuyFilterForm;
  setValue: UseFormSetValue<IBuyFilterForm>;
  addBadge: (badge: IFilterBadge | IFilterBadge[]) => void;
  removeBadgeByField: (fielf: string) => void;
  setBadges: (fnc: (prev: IFilterBadge[]) => IFilterBadge[]) => void;
}

const Price: FC<IPrice> = ({
  className,
  header,
  register,
  error,
  size,
  color,
  formValues,
  setValue,
  addBadge,
  removeBadgeByField,
  setBadges,
}) => {
  const { minPrice, maxPrice } = useTypedSelector((state) => state.filter);
  const dispatch = useDispatch();

  const onRemovePrice = (field: string) => {
    removeBadgeByField(field);
    setValue(field, undefined);
    dispatch(filtersUpdate({ page: 1, [field]: null }));
  };

  useEffect(() => {
    const defaultBadges: IFilterBadge[] = [];
    if (minPrice) {
      const badge = {
        value: `min price $${minPrice}`,
        field: 'minPrice',
        onRemove: () => onRemovePrice('minPrice'),
      };
      defaultBadges.push(badge);
      setValue('minPrice', Number(minPrice));
    }
    if (maxPrice) {
      const badge = {
        value: `max price $${maxPrice}`,
        field: 'maxPrice',
        onRemove: () => onRemovePrice('maxPrice'),
      };
      defaultBadges.push(badge);
      setValue('maxPrice', Number(maxPrice));
    }

    if (defaultBadges.length) {
      addBadge(defaultBadges);
    }
  }, []);

  const handleBlur = (e: ChangeEvent<HTMLInputElement>, field: string) => {
    let price: string | number = e.target.value;
    if (price) {
      if (field === 'minPrice' && formValues.maxPrice) {
        if (Number(price) > Number(formValues.maxPrice)) {
          price = formValues.maxPrice;
          setValue('minPrice', price);
        }
      }
      if (field === 'maxPrice' && formValues.minPrice) {
        if (Number(price) < Number(formValues.minPrice)) {
          price = formValues.minPrice;
          setValue('maxPrice', price);
        }
      }
      const badge = {
        value: `${field === 'minPrice' ? 'min price' : 'max price'} $${price}`,
        field,
        onRemove: () => onRemovePrice(field),
      };
      setBadges((prev) => {
        return prev.filter((item) => item.field !== field).concat([badge]);
      });
      dispatch(filtersUpdate({ page: 1, [field]: price }));
    } else {
      removeBadgeByField(field);
      dispatch(filtersUpdate({ page: 1, [field]: null }));
    }
  };

  const onKeyPressNumber = (e) => {
    const allowedKeys = ['.', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    if (!allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <AccordionItem
      className={className}
      title={header}
      defaultOpen
      size={size}
      color={color}
    >
      <div className={styles.priceWrapper}>
        <Input
          className={classNames('m-0', 'w-auto')}
          size='s'
          id={'minPrice'}
          placeholder='Min'
          {...register('minPrice', {
            onBlur: (e) => handleBlur(e, 'minPrice'),
          })}
          type='number'
          max={formValues.maxPrice}
          error={null}
          onKeyPress={onKeyPressNumber}
        />
        <div className={styles.priceTo}>to</div>
        <Input
          className={classNames('m-0', 'w-auto')}
          size='s'
          id={'maxPrice'}
          placeholder='Max'
          {...register('maxPrice', {
            onBlur: (e) => {
              handleBlur(e, 'maxPrice');
            },
          })}
          type='number'
          min={formValues.minPrice}
          error={null}
          onKeyPress={onKeyPressNumber}
        />
      </div>
      <div className={styles.priceError}>
        <div>{error?.minPrice?.message ? error.minPrice.message : null}</div>
        <div>{error?.maxPrice?.message ? error.maxPrice.message : null}</div>
      </div>
    </AccordionItem>
  );
};

export default Price;
