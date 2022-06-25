import { AppliedFilters } from '@components/AppliedFilters';
import { IFilterBadge } from '@components/BuyFilterBlock/BuyFilterBlock';
import {
  distributionsMap,
  distributionValues,
  handleAddBadge,
  handleChangeBoolean,
  handleChangeProp,
  handleInitBoolean,
  handleOnInitProp,
  handleOnRemoveBooleanBadge,
  handleOnRemovePropBadge,
} from '@components/BuyFilterBlock/BuyFilterBlock.helper';
import { CheckBoxGroup } from '@components/CheckBoxGroup';
import DateFilter from '@components/DateFilter';
import FormWrapper from '@components/shared/FormWrapper';
import { MenuBar } from '@components/shared/MenuBar';
import { filtersReset, filtersUpdate } from '@entities/filters/redux/actions';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTypedSelector } from '@hooks/useNewTypedSelector';
import { FC, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { IFilterState } from 'src/common/models/filter';
import { uuid } from 'uuidv4';
import {
  ICollectionFilterForm,
  statusValues,
  validationSchema,
} from './CollectionFilterBlock.helper';
import styles from './CollectionFilterBlock.module.scss';

interface ICollectionFilterBlockProps {
  callback: Function;
}

export const CollectionFilterBlock: FC<ICollectionFilterBlockProps> = ({
  callback,
}) => {
  const [badges, setBadges] = useState<IFilterBadge[]>([]);
  const dispatch = useDispatch();

  const removeBadgeByField = (field: string) =>
    setBadges((prev) => prev.filter((item) => item.field !== field));

  const {
    distributions,
    generative,
    status,
    dropDateFrom,
    dropDateTo,
    isResetAction,
  } = useTypedSelector((state) => state.filter);

  const defaultValues = {
    generative: { Yes: false, No: false },
    status: { available: false, solid: false },
    distributions: { AUCTION: false, FIXED_PRICE: false, PACKS: false },
  };

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ICollectionFilterForm>({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const onUpdateFilters = (data: Partial<IFilterState>) =>
    dispatch(filtersUpdate(data));

  const addBadge = handleAddBadge(setBadges);
  const dropDateRef = useRef<any>();

  const onSubmit = (data: ICollectionFilterForm) => {
    callback(data);
  };

  const onRemovePropBadge = handleOnRemovePropBadge(
    removeBadgeByField,
    setValue,
    getValues,
    onUpdateFilters
  );

  const changeProp = handleChangeProp(
    onRemovePropBadge,
    getValues,
    setBadges,
    onUpdateFilters
  );

  const onInitProp = handleOnInitProp(
    onRemovePropBadge,
    setBadges,
    getValues,
    setValue
  );

  const onRemoveBooleanBadge = handleOnRemoveBooleanBadge(
    removeBadgeByField,
    setValue,
    getValues,
    onUpdateFilters
  );

  const changeBoolean = handleChangeBoolean(
    onRemoveBooleanBadge,
    getValues,
    setBadges,
    onUpdateFilters
  );

  const onInitBoolean = handleInitBoolean(
    setValue,
    onRemoveBooleanBadge,
    addBadge
  );

  const clearAll = () => {
    reset();
    setBadges([]);
    onUpdateFilters({
      page: 1,
      generative: null,
      status: null,
      distributions: null,
    });
    dropDateRef.current?.clear?.();
  };

  useEffect(() => {
    isResetAction && clearAll();
  }, [isResetAction]);

  useEffect(() => {
    // This useEffect handling init values of filters from query string
    if (status) {
      onInitProp(status, 'status');
    }
    if (distributions) {
      onInitProp(distributions, 'distributions', distributionsMap);
    }
    if (generative) {
      onInitBoolean(generative, 'generative');
    }

    return () => {
      dispatch(filtersReset());
    };
  }, []);

  useEffect(() => {
    const subscription = watch((formValues, { name, type }) => {
      if (type !== 'change') {
        return;
      }
      const [field] = (name || '').split('.');

      if (name && field === 'status') {
        changeProp('status');
      }
      if (name && field === 'distributions') {
        changeProp('distributions', distributionsMap);
      }
      if (name && field === 'generative') {
        changeBoolean('generative');
      }

      console.log('watch form values: ', formValues);
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <MenuBar>
      <div className={styles['buy-filter-block-wrapper']}>
        <FormWrapper
          onSubmit={handleSubmit(onSubmit)}
          className={styles['buy-filter-form']}
        >
          <AppliedFilters
            size='s'
            color='default'
            isFirst={true}
            header='Applied filters'
            badges={badges}
            clearAll={clearAll}
          />

          <CheckBoxGroup
            className={styles.accordion}
            size='s'
            color='default'
            header='Status'
            checkboxArray={statusValues}
            register={register}
          />

          <CheckBoxGroup
            className={styles.accordion}
            size='s'
            color='default'
            header='Distribution type'
            checkboxArray={distributionValues}
            register={register}
          />

          <CheckBoxGroup
            className={styles.accordion}
            size='s'
            color='default'
            register={register}
            header={'Generative'}
            checkboxArray={['Yes', 'No'].map((value) => ({
              id: uuid(),
              name: `generative.${value}`,
              text: value,
              defaultChecked: false,
              error: null,
            }))}
          />

          <DateFilter
            setBadges={setBadges}
            header='Drop date'
            size='s'
            color='default'
            ref={dropDateRef}
            fromDate={dropDateFrom || undefined}
            toDate={dropDateTo || undefined}
            propName='dropDate'
            filterPropFrom='dropDateFrom'
            filterPropTo='dropDateTo'
          />
        </FormWrapper>
      </div>
    </MenuBar>
  );
};
