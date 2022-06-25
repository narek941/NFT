import * as Yup from 'yup';

import { AppliedFilters } from '@components/AppliedFilters';
import { CollectionFilters } from '@components/CollectionFilters';
import FormWrapper from '@components/shared/FormWrapper';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState, useEffect, FC, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { ICollection } from '@type/ICollection';
import styles from './ProfileFilterBlock.module.scss';
import { MenuBar } from '@components/shared/MenuBar';
import DateFilter from '@components/DateFilter';
import ToggleSwitchFilter from '@components/ToggleSwitchFilter/ToggleSwitchFilter';
import { useRouter } from 'next/router';
import { AnyProperties } from 'src/common/models/misc';
import { IFilterState } from 'src/common/models/filter';
import { useTypedSelector } from '@hooks/useNewTypedSelector';
import { useDispatch } from 'react-redux';
import { filtersUpdate } from '@entities/filters/redux/actions';
import {
  handleChangeUtility,
  handleOnRemoveUtilityBadge,
} from '@components/BuyFilterBlock/BuyFilterBlock.helper';

export type IProfileFilterForm = AnyProperties;

export interface IProfileFilterBlock {
  callback: (formValues: IProfileFilterForm) => void;
  collections: ICollection[];
}

export interface IFilterBadge {
  value: string;
  field: string;
  onRemove: () => void;
}

export const ProfileFilterBlock: FC<IProfileFilterBlock> = ({
  callback,
  collections,
}) => {
  const { collectionId, isResetAction } = useTypedSelector(
    (state) => state.filter
  );

  const dispatch = useDispatch();
  const dateRangeRef = useRef<any>(null);

  const updateFilters = (payload: Partial<IFilterState>) => {
    dispatch(filtersUpdate(payload));
  };

  const [chosenCollection, setChosenCollection] = useState<
    ICollection | undefined
  >();
  const [selectedCollectionId, setSelectedCollectionId] = useState(
    collectionId || undefined
  );
  const [traitMap, setTraitMap] = useState<string[]>([]);
  const query = useRouter() ? useRouter().query : {};

  const [badges, setBadges] = useState<IFilterBadge[]>([]);
  const addBadge = (badge: IFilterBadge | IFilterBadge[]) => {
    if (Array.isArray(badge)) {
      setBadges([...badges, ...badge]);
    } else {
      setBadges([...badges, badge]);
    }
  };
  const removeBadgeByField = (field: string) =>
    setBadges((prev) => prev.filter((item) => item.field !== field));

  const validationSchema = Yup.object().shape({});

  const defaultValues = {
    collectionId: collectionId || '',
  };

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IProfileFilterForm>({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const onSubmit = (data: IProfileFilterForm) => {
    console.log('form is submitted', data);
    callback(data);
  };

  const clearAll = () => {
    reset();
    setBadges([]);
    updateFilters({
      page: 1,
      collectionId: null,
      rarities: null,
      traits: null,
      fromDate: null,
      toDate: null,
      minPrice: null,
      maxPrice: null,
      utilities: null,
    });
    setChosenCollection(undefined);
    setSelectedCollectionId(undefined);
    dateRangeRef.current?.clear?.();
  };

  const onRemoveUtilityBadge = handleOnRemoveUtilityBadge(
    removeBadgeByField,
    setValue,
    getValues,
    updateFilters
  );

  const changeUtility = handleChangeUtility(
    getValues,
    setValue,
    onRemoveUtilityBadge,
    setBadges,
    updateFilters
  );

  const getNewRarities = (): [string | null, string[]] => {
    const formValues = getValues();
    const values = Object.keys(formValues.rarities).filter(
      (key) => formValues.rarities[key]
    );
    const newRarities = values.length ? values.join(',') : null;
    return [newRarities, values];
  };

  const onRarityBadgeRemove = (fieldValue: string, value: string) => () => {
    removeBadgeByField(fieldValue);
    const [, values] = getNewRarities();
    const newValues = values.filter((item) => item !== value);
    const formValues = getValues();

    setValue(
      'rarities',
      Object.keys(formValues.rarities).reduce((res, key) => {
        res[key] = newValues.includes(key);
        return res;
      }, {})
    );
    updateFilters({
      page: 1,
      rarities: newValues.length ? newValues.join(',') : null,
    });
  };

  const onTraitBadgeRemove = (fieldValue, value) => () => {
    removeBadgeByField(fieldValue);
    const traitsArr =
      new URLSearchParams(window.location.search).get('traits')?.split(',') ||
      [];
    const newTraits =
      traitsArr.filter((item) => item !== value).join(',') || null;

    updateFilters({ page: 1, traits: newTraits });
    setValue(fieldValue, false);
  };

  useEffect(() => {
    isResetAction && clearAll();
  }, [isResetAction]);

  useEffect(() => {
    const subscription = watch((formValues, { name, type }) => {
      if (type !== 'change') {
        return;
      }
      const [field] = (name || '').split('.');
      if (name && field === 'rarities') {
        const [newRarities, values] = getNewRarities();
        if (values.length) {
          const badges = values.map((value) => {
            const fieldValue = `rarity:${value}`;
            const badge = {
              value: fieldValue,
              field: fieldValue,
              onRemove: onRarityBadgeRemove(fieldValue, value),
            };
            return badge;
          });
          setBadges((prev) => {
            const cleared = prev.filter(
              (item) => item.field.split(':')[0] !== 'rarity'
            );
            return cleared.concat(badges);
          });
        }
        updateFilters({ page: 1, rarities: newRarities });
      }
      if (name && field === 'traits') {
        const traitBadges: IFilterBadge[] = [];
        const traitsArray = (formValues?.traits || []).reduce(
          (res, item, index) => {
            const traitDesc = traitMap[index];
            Object.keys(item?.values || {}).forEach((key) => {
              if (item.values[key]) {
                const badge = {
                  value: `${traitDesc}:${key}`,
                  field: `traits.${index}.values.${key}`,
                  onRemove: onTraitBadgeRemove(
                    `traits.${index}.values.${key}`,
                    `${traitDesc}:${key}`
                  ),
                };
                traitBadges.push(badge);
                res.push(`${traitDesc}:${key}`);
              }
            });
            return res;
          },
          []
        );
        setBadges((prev) => {
          const clearTraits = prev.filter(
            (item) => item.field.split('.')[0] !== 'traits'
          );
          return clearTraits.concat(traitBadges);
        });

        const newTraits = traitsArray.length ? traitsArray.join(',') : null;
        updateFilters({ page: 1, traits: newTraits });
      }
      if (name && field === 'utilities') {
        changeUtility();
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, traitMap]);

  return (
    <MenuBar>
      <div className={styles['profile-filter-block-wrapper']}>
        <FormWrapper
          onSubmit={handleSubmit(onSubmit)}
          className={styles['profile-filter-form']}
        >
          <AppliedFilters
            size='s'
            color='default'
            isFirst={true}
            header='Applied filters'
            badges={badges}
            clearAll={clearAll}
          />

          <CollectionFilters
            collections={collections}
            selectedCollectionId={selectedCollectionId}
            setSelectedCollectionId={setSelectedCollectionId}
            chosenCollection={chosenCollection}
            setChosenCollection={setChosenCollection}
            updateFilters={updateFilters}
            setTraitMap={setTraitMap}
            register={register}
            reset={reset}
            setValue={setValue}
            getValues={getValues}
            onRarityBadgeRemove={onRarityBadgeRemove}
            setBadges={setBadges}
            onTraitBadgeRemove={onTraitBadgeRemove}
            onRemoveUtilityBadge={onRemoveUtilityBadge}
          />
          {/* Please do not remove those lines. Mergeable feature should be done in future */}
          {/* <ToggleSwitchFilter
            id='mergeable'
            name='mergeable'
            register={register}
            title={
              <div className={(styles['label-large'], styles['label-bold'])}>
                Mergeable
              </div>
            }
          /> */}

          <DateFilter
            setBadges={setBadges}
            header='Creation date'
            size='s'
            color='default'
            ref={dateRangeRef}
            propName='dateRange'
            filterPropFrom='fromDate'
            filterPropTo='toDate'
            placeholderText='Select date or date range'
          />
        </FormWrapper>
      </div>
    </MenuBar>
  );
};
