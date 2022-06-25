import React, { FC, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CheckBoxGroup } from '@components/CheckBoxGroup';
import { AppliedFilters } from '@components/AppliedFilters';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import FormWrapper from '@shared/FormWrapper';
import Button from '@components/shared/Button';
import { useEffect } from '@storybook/addons';
import { CollectionFilters } from '@components/CollectionFilters';
import { collectionList } from 'src/__mocks__/collectionList';
import { IFilterBadge } from '@components/BuyFilterBlock/BuyFilterBlock';
import { MockFilterStore } from 'src/storage/mockFilterStore';
import { useTypedSelector } from '@hooks/useNewTypedSelector';
import { ICollection } from '@type/ICollection';
import { useDispatch } from 'react-redux';
import { filtersUpdate } from '@entities/filters/redux/actions';
import { AnyProperties } from 'src/common/models/misc';

export default {
  title: 'Components/CollectionFilters',
  component: CollectionFilters,
} as ComponentMeta<typeof CollectionFilters>;

interface ITestForm extends AnyProperties {
  test1?: boolean;
  test2?: boolean;
  test3?: boolean;
}

const Template: ComponentStory<typeof CollectionFilters> = (args) => {
  // const { collectionId } = useTypedSelector((state) => state.filter);

  const [chosenCollection, setChosenCollection] = useState<
    ICollection | undefined
  >();
  const [selectedCollectionId, setSelectedCollectionId] = useState<
    number | undefined
  >(undefined);
  const [traitMap, setTraitMap] = useState<string[]>([]);
  const [badges, setBadges] = useState<IFilterBadge[]>([]);

  const updateFilters = (payload) => {
    console.log('filters updated: ', payload);
  };

  // const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    test1: Yup.bool(),
    test2: Yup.bool(),
    test3: Yup.bool(),
  });

  const defaultValues = {
    test1: false,
    test2: false,
    test3: false,
  };

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ITestForm>({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const staticCheckboxArray = [
    {
      id: '1',
      name: 'test1',
      text: 'Test 1',
      error: null,
    },
    {
      id: '2',
      name: 'test2',
      text: 'Test 2',
      error: null,
    },
    {
      id: '3',
      name: 'test3',
      text: 'Test 3',
      error: null,
    },
  ];

  const onSubmit = (data: ITestForm) => {
    console.log('form is submitted', data);
  };

  const clearAll = () => {
    reset();
    setBadges([]);
  };

  const findBadgeName = (
    newBadges: IFilterBadge[],
    fieldName: string,
    data: object | boolean
  ) => {
    if (fieldName === 'collectionId') {
      // we don't need collection id tags, but we need this id in the form
      return;
    }
    if (typeof data === 'boolean') {
      data &&
        newBadges.push({
          value: fieldName,
          field: fieldName,
          onRemove: () => {},
        });
      return;
    }
    Object.keys(data).forEach((fieldName) =>
      findBadgeName(newBadges, fieldName, data[fieldName])
    );
  };

  const turnOffFormField = (name: string, data: object) => {
    Object.keys(data).forEach((fieldName) => {
      if (fieldName === name) {
        data[name] = false;
        return;
      }
      if (typeof data[fieldName] === 'object') {
        turnOffFormField(name, data[fieldName]);
      }
    });
  };

  const removeBadgeByField = (field: string) =>
    setBadges((prev) => prev.filter((item) => item.field !== field));

  const onRemoveUtilityBadge = (field: string) => {
    removeBadgeByField(field);
  };

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
    // dispatch(
    //   filtersUpdate({
    //     page: 1,
    //     rarities: newValues.length ? newValues.join(',') : null,
    //   })
    // );
  };

  const onTraitBadgeRemove = (fieldValue, value) => () => {
    removeBadgeByField(fieldValue);
    const traitsArr =
      new URLSearchParams(window.location.search).get('traits')?.split(',') ||
      [];
    const newTraits =
      traitsArr.filter((item) => item !== value).join(',') || null;

    // dispatch(filtersUpdate({ page: 1, traits: newTraits }));
    setValue(fieldValue, false);
  };

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
        // dispatch(filtersUpdate({ page: 1, rarities: newRarities }));
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
        // dispatch(filtersUpdate({ page: 1, traits: newTraits }));
      }
      console.log('watch form values: ', formValues);
    });

    return () => subscription.unsubscribe();
  }, [watch, traitMap]);

  return (
    <MockFilterStore>
      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <AppliedFilters header=' ' badges={badges} clearAll={clearAll} />
        <CheckBoxGroup
          header='Test group'
          checkboxArray={staticCheckboxArray}
          register={register}
        />
        <CollectionFilters
          collections={collectionList}
          register={register}
          reset={reset}
          setSelectedCollectionId={setSelectedCollectionId}
          selectedCollectionId={selectedCollectionId}
          chosenCollection={chosenCollection}
          setChosenCollection={setChosenCollection}
          setTraitMap={setTraitMap}
          setValue={setValue}
          setBadges={setBadges}
          onRarityBadgeRemove={onRarityBadgeRemove}
          onTraitBadgeRemove={onTraitBadgeRemove}
          getValues={getValues}
          updateFilters={updateFilters}
          onRemoveUtilityBadge={onRemoveUtilityBadge}
        />
        <Button size='l' color='blue' fillStyle={false} fullWidth={false}>
          Send test form
        </Button>
      </FormWrapper>
    </MockFilterStore>
  );
};

export const DefaultFilters = Template.bind({});
DefaultFilters.args = {};
