import { IBuyFilterForm, IFilterBadge } from './BuyFilterBlock';
import * as Yup from 'yup';
import { ParsedUrlQuery } from 'querystring';
import { IFilterState } from 'src/common/models/filter';
import {
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import { ICollection, ITrait } from '@type/ICollection';
import { getValueByPath } from 'src/common/utils/getValueByPath';
import { ICheckBox } from '@components/shared/CheckBox/CheckBox';
import { CheckBoxGroup } from '@components/CheckBoxGroup';
import { TraitInt } from './TraitInt';
import { uuid } from 'uuidv4';
import { TraitDate } from './TraitDate';
import styles from './BuyFilterBlock.module.scss';

export const getBracketsValue = (str: string) => {
  const ind = str.lastIndexOf('(');
  if (ind !== -1) {
    return str.slice(ind + 1, -1);
  }

  return '';
};

export const getBracketField = (str: string) => {
  const ind = str.lastIndexOf('(');
  if (ind !== -1) {
    return str.substring(0, ind);
  }

  return '';
};

export const handleAddBadge =
  (setBadges: Function) => (badge: IFilterBadge | IFilterBadge[]) => {
    setBadges((prev: IFilterBadge[]) =>
      Array.isArray(badge) ? [...prev, ...badge] : [...prev, badge]
    );
  };

export const validationSchema = Yup.object().shape({
  distributions: Yup.object().shape({
    AUCTION: Yup.bool(),
    FIXED_PRICE: Yup.bool(),
    PACKS: Yup.bool(),
  }),
  mergeable: Yup.object().shape({ Yes: Yup.bool(), No: Yup.bool() }),
  minPrice: Yup.number()
    .positive()
    .typeError('This field minPrice must contain only numbers')
    .nullable(true)
    .transform((_, val) => (val ? Number(val) : null)),
  maxPrice: Yup.number()
    .positive()
    .typeError('This field maxPrice must contain only numbers')
    .nullable(true)
    .transform((_, val) => (val ? Number(val) : null)),
});

export const distributionValues = [
  {
    id: uuid(),
    name: 'distributions.AUCTION',
    text: 'Auction',
    error: null,
  },
  {
    id: uuid(),
    name: 'distributions.FIXED_PRICE',
    text: 'Buy now',
    error: null,
  },
  {
    id: uuid(),
    name: 'distributions.PACKS',
    text: 'Packs',
    error: null,
  },
];

export const buyDistributionValues = distributionValues.slice(0, 2);

export const distributionsMap = {
  FIXED_PRICE: 'Buy now',
  AUCTION: 'Auction',
  PACKS: 'Packs',
};

export const statusValuesMap = {
  AVAILABLE: 'available',
  SOLD: 'sold',
};

export const getDefaultValues = (
  query: ParsedUrlQuery,
  data: Partial<IFilterState>
) => {
  const { minPrice, maxPrice, collectionId } = data;
  return {
    distributions: {
      AUCTION: false,
      FIXED_PRICE: false,
      packs: false,
    },
    minPrice: minPrice || '',
    maxPrice: maxPrice || '',
    mergeable: {
      Yes: query.mergeable === 'true',
      No: query.mergeable === 'false',
    },
    collectionId: collectionId || '',
    search: query.search || '',
    // sort: query.sort || '',
    // order: query.order || '',
    // greeneyes: uery?.greeneyes ? query?.greeneyes : '',
  };
};

export const handleGetNewRarities =
  (getValues: UseFormGetValues<IBuyFilterForm>) =>
  (): [string | null, string[]] => {
    const formValues = getValues();
    const values = Object.keys(formValues.rarities).filter(
      (key) => formValues.rarities[key]
    );
    const newRarities = values.length ? values.join(',') : null;
    return [newRarities, values];
  };

export const handleOnRarityBadgeRemove =
  (
    removeBadgeByField: (field: string) => void,
    getNewRarities: ReturnType<typeof handleGetNewRarities>,
    getValues: UseFormGetValues<IBuyFilterForm>,
    setValue: UseFormSetValue<IBuyFilterForm>,
    onUpdateFilters: (data: Partial<IFilterState>) => void
  ) =>
  (fieldValue: string, value: string) =>
  () => {
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
    onUpdateFilters({
      page: 1,
      rarities: newValues.length ? newValues.join(',') : null,
    });
  };

export const handleOnTraitBadgeRemove =
  (
    removeBadgeByField: (field: string) => void,
    onUpdateFilters: (data: Partial<IFilterState>) => void,
    setValue: UseFormSetValue<IBuyFilterForm>
  ) =>
  (fieldValue: string, urlValue: string) =>
  () => {
    removeBadgeByField(fieldValue);
    const traitsArr =
      new URLSearchParams(window.location.search).get('traits')?.split(',') ||
      [];
    const newTraits =
      traitsArr.filter((item) => item !== urlValue).join(',') || null;

    onUpdateFilters({ page: 1, traits: newTraits });
    setValue(fieldValue, false);
  };

export const handleChangeRarity =
  (
    getNewRarities: ReturnType<typeof handleGetNewRarities>,
    onRarityBadgeRemove: ReturnType<typeof handleOnRarityBadgeRemove>,
    setBadges: Function,
    onUpdateFilters: (data: Partial<IFilterState>) => void
  ) =>
  () => {
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
      setBadges((prev: IFilterBadge[]) => {
        const cleared = prev.filter(
          (item) => item.field.split(':')[0] !== 'rarity'
        );
        return cleared.concat(badges);
      });
    } else {
      setBadges((prev: IFilterBadge[]) => {
        const cleared = prev.filter(
          (item) => item.field.split(':')[0] !== 'rarity'
        );
        return cleared;
      });
    }
    onUpdateFilters({ page: 1, rarities: newRarities });
  };

export const handleChangeTrait =
  (
    onTraitBadgeRemove: ReturnType<typeof handleOnTraitBadgeRemove>,
    getValues: UseFormGetValues<IBuyFilterForm>,
    setBadges: Function,
    onUpdateFilters: (data: Partial<IFilterState>) => void
  ) =>
  (traitMap: string[], chosenCollection: ICollection) => {
    const formValues = getValues();
    const traitBadges: IFilterBadge[] = [];
    const traitsArray: string[] = (formValues?.traits || []).reduce(
      (res: string[], item: ITrait, index: number) => {
        const traitDesc = traitMap[index];
        const trait = chosenCollection!.traits[index];
        Object.keys(item?.values || {}).forEach((key) => {
          let urlValue = key;
          if (trait.type === 'integer' && item.values[key]) {
            res.push(`${key}(${item.values[key]})`);
            return;
          }
          if (trait.type === 'date' && item.values[key]) {
            res.push(`${key}(${item.values[key]})`);
            return;
          }
          if (trait.type === 'boolean') {
            urlValue = key === 'Yes' ? 'true' : 'false';
          }
          if (item.values[key]) {
            const badge = {
              value: `${traitDesc}:${key}`,
              field: `traits.${index}.values.${key}`,
              onRemove: onTraitBadgeRemove(
                `traits.${index}.values.${key}`,
                `${traitDesc}:${urlValue}`
              ),
            };
            traitBadges.push(badge);
            if (trait.type === 'boolean') {
              const currentValue = `${traitDesc}:${
                key === 'Yes' ? 'true' : 'false'
              }`;
              const opositeValue = `${traitDesc}:${
                key === 'Yes' ? 'false' : 'true'
              }`;
              const opositeIndex = res.indexOf(opositeValue);
              if (opositeIndex !== -1) {
                res.splice(opositeIndex, 1);
                return res;
              } else {
                res.push(currentValue);

                return res;
              }
            }
            res.push(`${traitDesc}:${key}`);
          }
        });
        return res;
      },
      []
    );
    setBadges((prev: IFilterBadge[]) => {
      const clearTraits = prev.filter(
        (item) => item.field.split('.')[0] !== 'traits'
      );
      return clearTraits.concat(traitBadges);
    });

    const newTraits = traitsArray.length ? traitsArray.join(',') : null;
    onUpdateFilters({ page: 1, traits: newTraits });
  };

export const handleOnInitRarities =
  (
    onRarityBadgeRemove: ReturnType<typeof handleOnRarityBadgeRemove>,
    setBadges: Function,
    setValue: UseFormSetValue<IBuyFilterForm>,
    getValues: Function
  ) =>
  (rarities: string, collectionRarities: string[]) => {
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

    const formRatities = collectionRarities.reduce((res, key) => {
      res[key] = false;
      return res;
    }, {} as any);
    setValue('rarities', Object.assign(formRatities, values));
  };

export const handleOnInitTraits =
  (
    onTraitBadgeRemove: ReturnType<typeof handleOnTraitBadgeRemove>,
    setBadges: Function,
    setValue: UseFormSetValue<IBuyFilterForm>
  ) =>
  (traits: string, traitMap: string[], chosenCollection: ICollection) => {
    const defaultBadges: IFilterBadge[] = [];
    const traitDescIndexMap = traitMap.reduce((res, desc, index) => {
      res[desc] = index;
      return res;
    }, {});

    const traitSelectedMap = traits.split(',').reduce((res, item) => {
      const [desc, urlValue] = item.split(':');
      const mapIndex = traitDescIndexMap[desc];

      let value = urlValue;
      const type = getValueByPath(chosenCollection!, `traits.${mapIndex}.type`);
      // integer and date types init in another components
      if (['integer', 'date'].includes(type)) {
        return res;
      }
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
  };

export const getCheckboxArray = (
  path: string,
  chosenCollection: ICollection,
  traitName: string,
  traitKeyValueMap: Record<string, any>
): ICheckBox[] => {
  if (!chosenCollection) {
    return [];
  }
  const values = getValueByPath(chosenCollection, path);
  return Array.isArray(values)
    ? values.map((value, index) => ({
        id: index + `${value}`,
        name: path + '.' + value,
        text: (
          <span className={styles['trait-text']}>
            {value}{' '}
            <span className={styles['trait-value']}>
              {traitName !== 'rarities' &&
                `(${traitKeyValueMap[`${traitName}:${value}`] || 0})`}
            </span>
          </span>
        ),
        defaultChecked: false,
        error: null,
      }))
    : [];
};

export const handleRemoveCollectionBadge = (
  setBadges: Function,
  setValue: Function,
  setChosenCollection: Function,
  setTraitMap: Function
) => {
  setChosenCollection(undefined);
  setValue('collectionId', '');
  setTraitMap([]);
  setValue('traits', []);
  setValue('rarities', {});
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

export const handleOnCollectionClick =
  (
    setChosenCollection: Function,
    setTraitMap: Function,
    setValue: UseFormSetValue<IBuyFilterForm>,
    onRemoveCollectionId: () => void,
    addBadge: ReturnType<typeof handleAddBadge>
  ) =>
  (id: number | undefined, collections: ICollection[]) => {
    if (!id) {
      setChosenCollection(undefined);
      setTraitMap([]);
      setValue('traits', []);
      setValue('rarities', {});

      return;
    }
    const chosenCollection = collections.find(
      (collection) => collection.id === id
    );
    setChosenCollection(chosenCollection);
    setTraitMap(
      (chosenCollection?.traits || []).map((item) => item.description)
    );
    setValue('traits', []);
    setValue('rarities', {});
    const badge: IFilterBadge = {
      value: chosenCollection?.name || '',
      field: 'collectionId',
      onRemove: onRemoveCollectionId,
    };
    addBadge(badge);
  };

export const handleOnRemoveUtilityBadge =
  (
    removeBadgeByField: (field: string) => void,
    setValue: UseFormSetValue<IBuyFilterForm>,
    getValues: UseFormGetValues<IBuyFilterForm>,
    onUpdateFilters: (data: Partial<IFilterState>) => void
  ) =>
  (field: string) => {
    removeBadgeByField(field);
    setValue(field.split(':').join('.'), false);
    setValue('isAllUtilitiesSelected', false);
    const { utilities = {} } = getValues();
    const selectedUtilities = Object.keys(utilities).filter(
      (name) => utilities[name]
    );

    onUpdateFilters({
      page: 1,
      utilities: selectedUtilities.length ? selectedUtilities.join(',') : null,
    });
  };

export const handleChangeUtility =
  (
    getValues: UseFormGetValues<IBuyFilterForm>,
    setValue: UseFormSetValue<IBuyFilterForm>,
    onRemoveUtilityBadge: ReturnType<typeof handleOnRemoveUtilityBadge>,
    setBadges: Function,
    onUpdateFilters: (data: Partial<IFilterState>) => void
  ) =>
  () => {
    const { utilities = {} } = getValues();

    const utilityBadges: IFilterBadge[] = [];
    const selectedUtilities: string[] = [];
    Object.keys(utilities).forEach((name) => {
      if (!utilities[name]) {
        return;
      }
      selectedUtilities.push(name);
      const field = `utilities:${name}`;
      const badge = {
        value: name.toLowerCase(),
        field: field,
        onRemove: () => onRemoveUtilityBadge(field),
      };
      utilityBadges.push(badge);
    });
    setBadges((prev: IFilterBadge[]) => {
      const cleared = prev.filter(
        (item) => item.field.split(':')[0] !== 'utilities'
      );
      return cleared.concat(utilityBadges);
    });

    const isAllSelected =
      selectedUtilities.length === Object.keys(utilities).length;
    setValue('isAllUtilitiesSelected', isAllSelected);

    onUpdateFilters({
      page: 1,
      utilities: selectedUtilities.length ? selectedUtilities.join(',') : null,
    });
  };

export const handleOnInitUtilities =
  (
    onRemoveUtilityBadge: ReturnType<typeof handleOnRemoveUtilityBadge>,
    setBadges: Function,
    getValues: UseFormGetValues<IBuyFilterForm>,
    setValue: UseFormSetValue<IBuyFilterForm>
  ) =>
  (utilities: string) => {
    const defaultBadges: IFilterBadge[] = [];
    const values: any = utilities.split(',').reduce((res, item) => {
      res[item] = true;
      const fieldValue = `utilities:${item}`;
      const badge = {
        value: item.toLowerCase(),
        field: fieldValue,
        onRemove: () => onRemoveUtilityBadge(`utilities:${item}`),
      };
      defaultBadges.push(badge);

      return res;
    }, {});
    if (defaultBadges.length) {
      setBadges((prev: IFilterBadge[]) => prev.concat(defaultBadges));
    }
    const { utilities: utilForms = {} } = getValues();
    if (defaultBadges.length === Object.keys(utilForms).length) {
      setValue('isAllUtilitiesSelected', true);
    }
    const { utilities: utilsForm = {} } = getValues();

    setValue('utilities', Object.assign(utilsForm, values));
  };

export const handleOnRemoveBooleanBadge =
  (
    removeBadgeByField: (field: string) => void,
    setValue: UseFormSetValue<IBuyFilterForm>,
    getValues: UseFormGetValues<IBuyFilterForm>,
    onUpdateFilters: (data: Partial<IFilterState>) => void
  ) =>
  (field: string, propName: string) => {
    removeBadgeByField(field);
    const key = field.split(':')[1];
    setValue(`${propName}.${key}`, false as never);
    const { [propName]: prop = {} } = getValues();
    const newUrlValues = ['Yes', 'No'].reduce((res: string[], name) => {
      if (prop[name]) {
        const currentValue = `${name === 'Yes' ? 'true' : 'false'}`;
        res.push(currentValue);
      }

      return res;
    }, []);
    const newProp = newUrlValues.length ? newUrlValues.join(',') : null;
    onUpdateFilters({ page: 1, [propName]: newProp });
  };

export const handleInitBoolean =
  (
    setValue: UseFormSetValue<IBuyFilterForm>,
    onRemoveBadge: ReturnType<typeof handleOnRemoveBooleanBadge>,
    addBadge: ReturnType<typeof handleAddBadge>
  ) =>
  (value: string, propName: string) => {
    const key = value === 'true' ? 'Yes' : 'No';
    setValue(`${propName}.${key}`, true);
    const field = `${propName}:${key}`;
    const badge = {
      value: field,
      field: field,
      onRemove: () => onRemoveBadge(field, propName),
    };
    addBadge(badge);
  };

export const handleChangeBoolean =
  (
    onRemoveBadge: ReturnType<typeof handleOnRemoveBooleanBadge>,
    getValues: UseFormGetValues<IBuyFilterForm>,
    setBadges: Function,
    onUpdateFilters: (data: Partial<IFilterState>) => void
  ) =>
  (propName: string) => {
    const { [propName]: prop = {} } = getValues();
    const newBadges: IFilterBadge[] = [];
    const propArray = ['Yes', 'No'].reduce((res: string[], key: string) => {
      if (prop[key]) {
        const field = `${propName}:${key}`;
        const badge = {
          value: field,
          field: field,
          onRemove: () => onRemoveBadge(field, propName),
        };
        newBadges.push(badge);
        const currentValue = `${key === 'Yes' ? 'true' : 'false'}`;
        const opositeValue = `${key === 'Yes' ? 'false' : 'true'}`;
        const opositeIndex = res.indexOf(opositeValue);
        if (opositeIndex !== -1) {
          return [];
        }
        res.push(currentValue);
      }

      return res;
    }, []);
    setBadges((prev: IFilterBadge[]) => {
      const cleared = prev.filter(
        (item) => item.field.split(':')[0] !== propName
      );
      return cleared.concat(newBadges);
    });

    const newProp = propArray.length ? propArray.join(',') : null;
    onUpdateFilters({ page: 1, [propName]: newProp });
  };

export const handleOnRemovePropBadge =
  (
    removeBadgeByField: (field: string) => void,
    setValue: UseFormSetValue<IBuyFilterForm>,
    getValues: UseFormGetValues<IBuyFilterForm>,
    onUpdateFilters: (data: Partial<IFilterState>) => void
  ) =>
  (field: string, propName: string) => {
    removeBadgeByField(field);
    setValue(field.split(':').join('.'), false);
    const { [propName]: prop = {} } = getValues();
    const selected = Object.keys(prop).filter((name) => prop[name]);

    onUpdateFilters({
      page: 1,
      [propName]: selected.length ? selected.join(',') : null,
    });
  };

export const handleOnInitProp =
  (
    onRemovePropBadge: ReturnType<typeof handleOnRemovePropBadge>,
    setBadges: Function,
    getValues: UseFormGetValues<IBuyFilterForm>,
    setValue: UseFormSetValue<IBuyFilterForm>
  ) =>
  (
    initValues: string,
    propName: string,
    mappingName: Record<string, string> = {}
  ) => {
    const defaultBadges: IFilterBadge[] = [];
    const values: any = initValues.split(',').reduce((res, item) => {
      res[item] = true;
      const fieldValue = `${propName}:${item}`;
      const badge = {
        value: mappingName[item] || item,
        field: fieldValue,
        onRemove: () => onRemovePropBadge(`${propName}:${item}`, propName),
      };
      defaultBadges.push(badge);

      return res;
    }, {});
    if (defaultBadges.length) {
      setBadges((prev: IFilterBadge[]) => prev.concat(defaultBadges));
    }
    const { [propName]: prop = {} } = getValues();

    setValue(propName, Object.assign(prop, values));
  };

export const handleChangeProp =
  (
    onRemovePropBadge: ReturnType<typeof handleOnRemovePropBadge>,
    getValues: UseFormGetValues<IBuyFilterForm>,
    setBadges: Function,
    onUpdateFilters: (data: Partial<IFilterState>) => void
  ) =>
  (propName: string, mappingName: Record<string, any> = {}) => {
    const { [propName]: prop = {} } = getValues();

    const newBadges: IFilterBadge[] = [];
    const selected: string[] = [];
    Object.keys(prop).forEach((name) => {
      if (!prop[name]) {
        return;
      }
      selected.push(name);
      const field = `${propName}:${name}`;
      const badge = {
        value: mappingName[name] || name,
        field: field,
        onRemove: () => onRemovePropBadge(field, propName),
      };
      newBadges.push(badge);
    });
    setBadges((prev: IFilterBadge[]) => {
      const cleared = prev.filter(
        (item) => item.field.split(':')[0] !== propName
      );
      return cleared.concat(newBadges);
    });

    onUpdateFilters({
      page: 1,
      [propName]: selected.length ? selected.join(',') : null,
    });
  };

export const handleRenderTrait =
  (
    register: UseFormRegister<IBuyFilterForm>,
    setValue: UseFormSetValue<IBuyFilterForm>,
    getValues: UseFormGetValues<IBuyFilterForm>,
    setBadges: Function
  ) =>
  (
    path: string,
    trait: ITrait,
    index: number,
    chosenCollection: ICollection,
    traitKeyValueMap: Record<string, any>
  ): any => {
    if (trait.type === 'string') {
      return (
        <CheckBoxGroup
          className={styles.subAccordion}
          key={index}
          register={register}
          header={trait.description}
          checkboxArray={getCheckboxArray(
            path,
            chosenCollection,
            trait.description,
            traitKeyValueMap
          )}
        />
      );
    }
    if (trait.type === 'boolean') {
      const values = ['Yes', 'No'].map((value, index) => ({
        id: uuid(),
        name: `${path}.${value}`,
        text: value,
        defaultChecked: false,
        error: null,
      }));
      return (
        <CheckBoxGroup
          className={styles.subAccordion}
          key={index}
          register={register}
          header={trait.description}
          checkboxArray={values}
        />
      );
    }
    if (trait.type === 'integer') {
      return (
        <TraitInt
          className={styles['subAccordion']}
          path={path}
          setBadges={setBadges}
          trait={trait}
          getValues={getValues}
          setValue={setValue}
          register={register}
        />
      );
    }
    if (trait.type === 'date') {
      return (
        <TraitDate
          className={styles['subAccordion']}
          setBadges={setBadges}
          trait={trait}
          register={register}
          path={`${path}.${trait.description}`}
          placeholderText='Select date or date range'
        />
      );
    }
  };
