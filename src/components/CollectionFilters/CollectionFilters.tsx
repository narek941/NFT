/* global JSX*/
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { ICheckBox } from '@shared/CheckBox/CheckBox';
import styles from './CollectionFilters.styles.module.scss';
import {
  UseFormGetValues,
  UseFormRegister,
  UseFormReset,
  UseFormSetValue,
} from 'react-hook-form';
import { ICollection, ITrait } from '@type/ICollection';
import { CheckBoxGroup } from '@components/CheckBoxGroup';
import { getValueByPath } from 'src/common/utils/getValueByPath';
import { CollectionSelect } from '@components/CollectionSelect';
import { useNoInitialEffect } from '@hooks/useNoInitialEffect';
import { useDispatch } from 'react-redux';
import { filtersUpdate } from '@entities/filters/redux/actions';
import { useTypedSelector } from '@hooks/useNewTypedSelector';
import {
  IBuyFilterForm,
  IFilterBadge,
} from '@components/BuyFilterBlock/BuyFilterBlock';
import { UtitlityFilter } from '@components/BuyFilterBlock/UtitlityFilter';
import { IFilterState } from 'src/common/models/filter';
import {
  handleOnInitUtilities,
  handleOnRemoveUtilityBadge,
} from '@components/BuyFilterBlock/BuyFilterBlock.helper';

export interface ICollectionFilters {
  collections: ICollection[];
  register: UseFormRegister<any>;
  reset: UseFormReset<any>;
  size?: 's' | 'm' | 'l';
  color?: 'primary' | 'default';
  setValue: UseFormSetValue<IBuyFilterForm>;
  getValues: UseFormGetValues<IBuyFilterForm>;
  updateFilters: (payload: Partial<IFilterState>) => void;
  selectedCollectionId?: number;
  chosenCollection?: ICollection;
  setChosenCollection: Dispatch<SetStateAction<ICollection | undefined>>;
  setSelectedCollectionId: Dispatch<SetStateAction<number | undefined>>;
  setTraitMap: Dispatch<SetStateAction<string[]>>;
  setBadges: Function;
  onRarityBadgeRemove: Function;
  onTraitBadgeRemove: Function;
  onRemoveUtilityBadge: (field: string) => void;
}

export const CollectionFilters: FC<ICollectionFilters> = ({
  collections,
  register,
  reset,
  size,
  color,
  setValue,
  getValues,
  selectedCollectionId,
  chosenCollection,
  setChosenCollection,
  setSelectedCollectionId,
  setTraitMap,
  setBadges,
  onRarityBadgeRemove,
  onTraitBadgeRemove,
  onRemoveUtilityBadge,
  updateFilters,
}) => {
  const { collectionId, rarities, traits, utilities } = useTypedSelector(
    (state) => state.filter
  );
  const dispath = useDispatch();

  const removeBadgeByField = (field: string) =>
    setBadges((prev) => prev.filter((item) => item.field !== field));

  const handleCollectionClick = (id: number | undefined) => {
    if (!id) {
      setChosenCollection(undefined);
      setSelectedCollectionId(undefined);
      setTraitMap([]);
      setValue('traits', []);
      setValue('rarities', {});

      return;
    }
    const chosenCollection = collections.find(
      (collection) => collection.id === id
    );
    setChosenCollection(chosenCollection);
    setSelectedCollectionId(id);
    setTraitMap(
      (chosenCollection?.traits || []).map((item) => item.description)
    );
    setValue('traits', []);
    setValue('rarities', {});
    const badge = {
      value: chosenCollection?.name,
      field: 'collectionId',
      onRemove: onRemoveCollectionId,
    };
    setBadges((prev) => [...prev, badge]);
  };

  const getCheckboxArray = (path: string): ICheckBox[] => {
    if (!chosenCollection) {
      return [];
    }
    const values = getValueByPath(chosenCollection, path);
    return Array.isArray(values)
      ? values.map((value, index) => ({
          id: index + `${value}`,
          name: path + '.' + value,
          text: value,
          defaultChecked: false,
          error: null,
        }))
      : [];
  };

  const handleRemoveCollectionBadge = () => {
    setBadges((badges: IFilterBadge[]) =>
      badges.filter((item) => {
        const rarityField = item.field.split(':')[0];
        const traitField = item.field.split('.')[0];
        return (
          item.field !== 'collectionId' &&
          rarityField !== 'rarity' &&
          traitField !== 'traits'
        );
      })
    );
  };

  const onRemoveCollectionId = () => {
    handleCollectionClick(undefined);
    dispath(
      filtersUpdate({
        page: 1,
        collectionId: null,
        rarities: null,
        traits: null,
      })
    );
    handleRemoveCollectionBadge();
  };

  const onInitUtilities = handleOnInitUtilities(
    onRemoveUtilityBadge,
    setBadges,
    getValues,
    setValue
  );

  useEffect(() => {
    if (collectionId) {
      const chosenCollection = collections.find(
        (collection) => collection.id === collectionId
      );
      const traitMap = (chosenCollection?.traits || []).map(
        (item) => item.description
      );
      setTraitMap(traitMap);

      if (rarities) {
        const defaultBadges: IFilterBadge[] = [];
        const values = rarities.split(',').reduce((res, item) => {
          res[item] = true;
          const fieldValue = `rarity:${item}`;
          const badge = {
            value: fieldValue,
            field: fieldValue,
            onRemove: onRarityBadgeRemove(fieldValue, item),
          };
          defaultBadges.push(badge);

          return res;
        }, {});
        if (defaultBadges.length) {
          setBadges((prev: IFilterBadge[]) => prev.concat(defaultBadges));
        }
        setValue('rarities', values);
      }
      if (traits) {
        const defaultBadges: IFilterBadge[] = [];
        const traitDescIndexMap = traitMap.reduce((res, desc, index) => {
          res[desc] = index;
          return res;
        }, {});

        const traitSelectedMap = traits.split(',').reduce((res, item) => {
          const [desc, urlValue] = item.split(':');
          const mapIndex = traitDescIndexMap[desc];

          let value = urlValue;
          const type = getValueByPath(
            chosenCollection!,
            `traits.${mapIndex}.type`
          );
          if (type === 'boolean') {
            value = urlValue === 'true' ? 'Yes' : 'No';
          }

          const badge = {
            value: `${desc}:${value}`,
            field: `traits.${mapIndex}.values.${value}`,
            onRemove: onTraitBadgeRemove(
              `traits.${mapIndex}.values.${value}`,
              `${desc}:${urlValue}`
            ),
          };
          defaultBadges.push(badge);

          if (res[mapIndex]) {
            res[mapIndex][value] = true;
          } else {
            res[mapIndex] = { [value]: true };
          }
          return res;
        }, {});

        const selectedValues = (chosenCollection?.traits || []).reduce<any>(
          (res, item, index) => {
            if (item.type === 'boolean') {
              res.push({
                values: {
                  Yes: traitSelectedMap[index]?.['Yes'],
                  No: traitSelectedMap[index]?.['No'],
                },
              });
              return res;
            }
            const vals = item.values?.reduce((traitVals, valKey) => {
              traitVals[valKey] = traitSelectedMap[index]?.[valKey] || false;

              return traitVals;
            }, {});
            if (vals) {
              res.push({ values: vals });
            }

            return res;
          },
          []
        );
        setBadges((prev: IFilterBadge[]) => prev.concat(defaultBadges));
        setValue('traits', selectedValues);
      }
      if (utilities) {
        onInitUtilities(utilities);
      }
    }
  }, []);

  useNoInitialEffect(() => {
    if (chosenCollection) {
      dispath(
        filtersUpdate({
          page: 1,
          collectionId: chosenCollection.id,
          rarities: null,
          traits: null,
        })
      );
      return;
    }
    handleRemoveCollectionBadge();
    dispath(
      filtersUpdate({
        page: 1,
        collectionId: null,
        rarities: null,
        traits: null,
      })
    );
  }, [selectedCollectionId]);

  const renderTrait = (
    path: string,
    trait: ITrait,
    index: number
  ): JSX.Element => {
    if (trait.type === 'string') {
      return (
        <CheckBoxGroup
          className={styles.accordion}
          size='s'
          color='default'
          key={index}
          register={register}
          header={trait.description}
          checkboxArray={getCheckboxArray(path)}
        />
      );
    }
    if (trait.type === 'boolean') {
      const values = ['Yes', 'No'].map((value, index) => ({
        id: index + `${value}`,
        name: path + '.' + value,
        text: value,
        defaultChecked: false,
        error: null,
      }));
      return (
        <CheckBoxGroup
          className={styles.accordion}
          size='s'
          color='default'
          key={index}
          register={register}
          header={trait.description}
          checkboxArray={values}
        />
      );
    }
    return (
      <CheckBoxGroup
        className={styles.accordion}
        size='s'
        color='default'
        key={index}
        register={register}
        header={trait.description}
        checkboxArray={[]}
      />
    );
  };

  return (
    <div className={styles['collection-filters-wrapper']}>
      <CollectionSelect
        header='Collection'
        size='s'
        color='default'
        collections={collections}
        collectionId={selectedCollectionId}
        register={register}
        reset={reset}
        callback={handleCollectionClick}
      />
      {chosenCollection && (
        <div className={styles['checkbox-group']}>
          <CheckBoxGroup
            size='s'
            color='default'
            register={register}
            header='Rarities'
            checkboxArray={getCheckboxArray('rarities')}
          />
        </div>
      )}
      {chosenCollection && (
        <UtitlityFilter
          register={register}
          redeemOptions={chosenCollection.redeemOptions}
          getValues={getValues}
          setValue={setValue}
          setBadges={setBadges}
          onUpdateFilters={updateFilters}
          onRemoveUtilityBadge={onRemoveUtilityBadge}
        />
      )}
      {chosenCollection &&
        chosenCollection?.traits?.map((trait, index) =>
          renderTrait(`traits.${index}.values`, trait, index)
        )}
    </div>
  );
};
