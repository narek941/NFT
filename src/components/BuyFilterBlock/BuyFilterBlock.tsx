import { AppliedFilters } from '@components/AppliedFilters';
import { CheckBoxGroup } from '@components/CheckBoxGroup';
import FormWrapper from '@components/shared/FormWrapper';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState, useEffect, FC, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { ICollection } from '@type/ICollection';
import styles from './BuyFilterBlock.module.scss';
import { MenuBar } from '@components/shared/MenuBar';
import Price from '@components/Price';
import DateFilter from '@components/DateFilter';
import { useRouter } from 'next/router';
import { AnyProperties } from 'src/common/models/misc';
import { useTypedSelector } from '@hooks/useNewTypedSelector';
import { useDispatch } from 'react-redux';
import { filtersReset, filtersUpdate } from '@entities/filters/redux/actions';
import {
  distributionsMap,
  buyDistributionValues,
  getCheckboxArray,
  getDefaultValues,
  handleAddBadge,
  handleChangeBoolean,
  handleChangeProp,
  handleChangeRarity,
  handleChangeTrait,
  handleChangeUtility,
  handleGetNewRarities,
  handleInitBoolean,
  handleOnCollectionClick,
  handleOnInitProp,
  handleOnInitRarities,
  handleOnInitTraits,
  handleOnInitUtilities,
  handleOnRarityBadgeRemove,
  handleOnRemoveBooleanBadge,
  handleOnRemovePropBadge,
  handleOnRemoveUtilityBadge,
  handleOnTraitBadgeRemove,
  handleRemoveCollectionBadge,
  handleRenderTrait,
  validationSchema,
  statusValuesMap,
} from './BuyFilterBlock.helper';
import { IFilterState } from 'src/common/models/filter';
import { CollectionSelect } from '@components/CollectionSelect';
import { useNoInitialEffect } from '@hooks/useNoInitialEffect';
import { UtitlityFilter } from './UtitlityFilter';
import { uuid } from 'uuidv4';
import AccordionItem from '@components/shared/Accordion/AccordionItem';
import { statusValues } from '@components/Collection/CollectionFilterBlock/CollectionFilterBlock.helper';
import classNames from 'classnames';

import IconR from '/public/field-icons/menubar-r.svg';

type StaticCheckboxProps = {
  buyNow?: boolean;
  auction?: boolean;
  minPrice?: string | number;
  maxPrice?: string | number;
  utilities?: Record<string, boolean>[];
  mergeable?: { Yes: boolean; No: boolean };
};

export type IBuyFilterForm = StaticCheckboxProps & AnyProperties;

export interface IBuyFilterBlock {
  callback: (formValues: IBuyFilterForm) => void;
  collections: ICollection[];
  withDefaultCollection?: boolean;
  traitKeyValueMap?: Record<string, number>;
  raritiesMap?: Record<string, number>;
}

export interface IFilterBadge {
  value: string;
  field: string;
  onRemove: () => void;
}

export const BuyFilterBlock: FC<IBuyFilterBlock> = ({
  callback,
  collections,
  traitKeyValueMap = {},
  raritiesMap = {},
  withDefaultCollection,
}) => {
  const {
    minPrice,
    maxPrice,
    collectionId,
    traits,
    rarities,
    utilities,
    mergeable,
    distributions,
    status,
    fromDate,
    toDate,
    isResetAction,
  } = useTypedSelector((state) => state.filter);
  const dateRangeRef = useRef<any>(null);

  const findenCollection = collections.find((item) => item.id === collectionId);

  const [chosenCollection, setChosenCollection] = useState<
    ICollection | undefined
  >(withDefaultCollection ? collections[0] : findenCollection);
  const [traitMap, setTraitMap] = useState<string[]>(
    withDefaultCollection
      ? (chosenCollection?.traits || []).map((item) => item.description)
      : []
  );
  const dispatch = useDispatch();
  const query = useRouter() ? useRouter().query : {};

  const [badges, setBadges] = useState<IFilterBadge[]>([]);
  const addBadge = handleAddBadge(setBadges);
  const removeBadgeByField = (field: string) =>
    setBadges((prev) => prev.filter((item) => item.field !== field));

  const defaultValues = getDefaultValues(query, {
    minPrice,
    maxPrice,
    collectionId,
  });

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IBuyFilterForm>({
    resolver: yupResolver(validationSchema),
    defaultValues,
    mode: 'onChange',
  });

  const formValues = getValues();

  const onUpdateFilters = (data: Partial<IFilterState>) => {
    dispatch(filtersUpdate(data));
  };

  const onSubmit = (data: IBuyFilterForm) => {
    console.log('form is submitted', data);
    callback(data);
  };

  const clearAll = () => {
    reset();
    setBadges([]);
    onUpdateFilters({
      page: 1,
      collectionId: null,
      rarities: null,
      traits: null,
      fromDate: null,
      toDate: null,
      minPrice: null,
      maxPrice: null,
      utilities: null,
      mergeable: null,
      distributions: null,
      status: null,
      search: null,
      sort: null,
      order: null,
    });
    !withDefaultCollection && setChosenCollection(undefined);
    dateRangeRef.current?.clear?.();
  };

  const getNewRarities = handleGetNewRarities(getValues);

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

  const onRarityBadgeRemove = handleOnRarityBadgeRemove(
    removeBadgeByField,
    getNewRarities,
    getValues,
    setValue,
    onUpdateFilters
  );

  const onTraitBadgeRemove = handleOnTraitBadgeRemove(
    removeBadgeByField,
    onUpdateFilters,
    setValue
  );

  const changeRarity = handleChangeRarity(
    getNewRarities,
    onRarityBadgeRemove,
    setBadges,
    onUpdateFilters
  );

  const changeTrait = handleChangeTrait(
    onTraitBadgeRemove,
    getValues,
    setBadges,
    onUpdateFilters
  );

  const onInitRarities = handleOnInitRarities(
    onRarityBadgeRemove,
    setBadges,
    setValue,
    getValues
  );

  const onInitTraits = handleOnInitTraits(
    onTraitBadgeRemove,
    setBadges,
    setValue
  );

  const renderTrait = handleRenderTrait(
    register,
    setValue,
    getValues,
    setBadges
  );

  const onRemoveUtilityBadge = handleOnRemoveUtilityBadge(
    removeBadgeByField,
    setValue,
    getValues,
    onUpdateFilters
  );

  const changeUtility = handleChangeUtility(
    getValues,
    setValue,
    onRemoveUtilityBadge,
    setBadges,
    onUpdateFilters
  );

  const onInitUtilities = handleOnInitUtilities(
    onRemoveUtilityBadge,
    setBadges,
    getValues,
    setValue
  );

  useEffect(() => {
    isResetAction && clearAll();
  }, [isResetAction]);

  useEffect(() => {
    // This useEffect handling init values of filters from query string
    if (collectionId || withDefaultCollection) {
      if (rarities) {
        onInitRarities(rarities, chosenCollection?.rarities || []);
      }
      if (traits) {
        const traitMap = (chosenCollection?.traits || []).map(
          (item) => item.description
        );
        onInitTraits(traits, traitMap, chosenCollection!);
      }
      if (utilities) {
        onInitUtilities(utilities);
      }
    }

    if (distributions) {
      onInitProp(distributions, 'distributions', distributionsMap);
    }
    if (status) {
      onInitProp(status, 'status', statusValuesMap);
    }
    if (mergeable) {
      onInitBoolean(mergeable, 'mergeable');
    }

    return () => {
      dispatch(filtersReset());
    };
  }, []);

  useNoInitialEffect(() => {
    if (withDefaultCollection) {
      return;
    }
    if (chosenCollection) {
      onUpdateFilters({
        page: 1,
        collectionId: chosenCollection.id,
        rarities: null,
        traits: null,
      });
      return;
    }

    handleRemoveCollectionBadge(
      setBadges,
      setValue,
      setChosenCollection,
      setTraitMap
    );
    onUpdateFilters({
      page: 1,
      collectionId: null,
      rarities: null,
      traits: null,
    });
  }, [chosenCollection]);

  useEffect(() => {
    const subscription = watch((formValues, { name, type }) => {
      if (type !== 'change') {
        return;
      }
      const [field] = (name || '').split('.');
      const isIntOrDate = (name || '').split(':').length > 1;
      if (name && field === 'rarities') {
        changeRarity();
      }
      if (name && field === 'traits' && !isIntOrDate) {
        changeTrait(traitMap, chosenCollection!);
      }

      if (name && field === 'utilities') {
        changeUtility();
      }
      if (name && field === 'mergeable') {
        changeBoolean('mergeable');
      }
      if (name && field === 'distributions') {
        changeProp('distributions', distributionsMap);
      }
      if (name && field === 'status') {
        changeProp('status', statusValuesMap);
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, traitMap]);

  const onRemoveCollectionId = () => {
    onUpdateFilters({
      page: 1,
      collectionId: null,
      rarities: null,
      traits: null,
    });
    handleRemoveCollectionBadge(
      setBadges,
      setValue,
      setChosenCollection,
      setTraitMap
    );
  };

  const handleCollectionClick = handleOnCollectionClick(
    setChosenCollection,
    setTraitMap,
    setValue,
    onRemoveCollectionId,
    addBadge
  );

  return (
    <>
      <MenuBar>
        <FormWrapper
          className={styles['buy-filter-form']}
          onSubmit={handleSubmit(onSubmit)}
        >
          <AppliedFilters
            size='s'
            color='default'
            isFirst={true}
            header='Applied filters'
            badges={badges}
            clearAll={clearAll}
          />
          <AccordionItem
            defaultOpen
            size='s'
            color='default'
            title={withDefaultCollection ? 'Status' : 'Buy option'}
            className={styles['accordion']}
          >
            <CheckBoxGroup
              checkboxArray={
                withDefaultCollection ? statusValues : buyDistributionValues
              }
              register={register}
            />
          </AccordionItem>
          {!withDefaultCollection && (
            <Price
              className={classNames(
                styles['price-container'],
                styles['accordion']
              )}
              size='s'
              color='default'
              header='Price (USD)'
              register={register}
              setValue={setValue}
              formValues={formValues}
              error={errors}
              addBadge={addBadge}
              removeBadgeByField={removeBadgeByField}
              setBadges={setBadges}
            />
          )}
          <div className={styles['collection-filters-wrapper']}>
            {collections && !withDefaultCollection && (
              <CollectionSelect
                header='Collection'
                size='s'
                color='default'
                collections={collections}
                collectionId={collectionId}
                register={register}
                reset={reset}
                callback={handleCollectionClick}
              />
            )}
            {chosenCollection && (
              <AccordionItem
                defaultOpen
                size='s'
                color='default'
                title='Rarity'
                className={styles['subAccordion']}
              >
                <CheckBoxGroup
                  className={styles.titleBig}
                  register={register}
                  checkboxArray={getCheckboxArray(
                    'rarities',
                    chosenCollection,
                    'rarities',
                    raritiesMap
                  )}
                />
              </AccordionItem>
            )}

            {chosenCollection && (
              <UtitlityFilter
                register={register}
                redeemOptions={chosenCollection.redeemOptions}
                getValues={getValues}
                setValue={setValue}
                setBadges={setBadges}
                onUpdateFilters={onUpdateFilters}
                onRemoveUtilityBadge={onRemoveUtilityBadge}
              />
            )}

            {chosenCollection?.traits && (
              <AccordionItem
                defaultOpen
                title='Traits'
                size={'s'}
                color={'default'}
                className={styles['accordion-traits']}
              >
                {chosenCollection.traits.map((trait, index) =>
                  renderTrait(
                    `traits.${index}.values`,
                    trait,
                    index,
                    chosenCollection!,
                    traitKeyValueMap
                  )
                )}
              </AccordionItem>
            )}
          </div>
          {/* Please do not remove those lines. Mergeable feature should be done in future */}
          {/* {chosenCollection && (
            <CheckBoxGroup
              className={classNames(
                styles['checkbox-group-mergeable'],
                styles.checkBoxGroup
              )}
              size='m'
              register={register}
              header={'Mergeable'}
              checkboxArray={['Yes', 'No'].map((value) => ({
                id: uuid(),
                name: `mergeable.${value}`,
                text: value,
                defaultChecked: false,
                error: null,
              }))}
            />
          )} */}

          {chosenCollection && (
            <DateFilter
              setBadges={setBadges}
              header='Creation date'
              size='s'
              color='default'
              ref={dateRangeRef}
              fromDate={fromDate || undefined}
              toDate={toDate || undefined}
              propName='dateRange'
              filterPropFrom='fromDate'
              filterPropTo='toDate'
              placeholderText='Select date or date range'
            />
          )}
        </FormWrapper>
      </MenuBar>
    </>
  );
};
