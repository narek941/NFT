import CheckBox from '@components/shared/CheckBox';
import { ICollection } from '@type/ICollection';
import { FC, useState } from 'react';
import cn from 'classnames';
import { uuid } from 'uuidv4';
import styles from './UtitlityFilter.module.scss';
import { IBuyFilterForm, IFilterBadge } from '../BuyFilterBlock';
import { handleOnRemoveUtilityBadge } from '../BuyFilterBlock.helper';
import { IFilterState } from 'src/common/models/filter';
import {
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import AccordionItem from '@components/shared/Accordion/AccordionItem';

interface IUtitlityFilterProps {
  redeemOptions: ICollection['redeemOptions'];
  register: UseFormRegister<IBuyFilterForm>;
  getValues: UseFormGetValues<IBuyFilterForm>;
  setValue: UseFormSetValue<IBuyFilterForm>;
  setBadges: Function;
  onUpdateFilters: (data: Partial<IFilterState>) => void;
  onRemoveUtilityBadge: ReturnType<typeof handleOnRemoveUtilityBadge>;
}

export const UtitlityFilter: FC<IUtitlityFilterProps> = (props) => {
  const {
    redeemOptions,
    register,
    getValues,
    setValue,
    setBadges,
    onUpdateFilters,
    onRemoveUtilityBadge,
  } = props;

  const [isOpen, setIsOpen] = useState(false);

  const handleSelectAll = () => {
    const { isAllUtilitiesSelected, utilities = {} } = getValues();
    const utilitiesNames = Object.keys(utilities);
    if (isAllUtilitiesSelected) {
      setValue(
        'utilities',
        utilitiesNames.reduce((res, name) => {
          res[name] = false;
          return res;
        }, {}) as any
      );
      setValue('isAllUtilitiesSelected', false);
      setBadges((prev: IFilterBadge[]) =>
        prev.filter((item) => item.field.split(':')[0] !== 'utilities')
      );
      onUpdateFilters({ page: 1, utilities: null });
    }

    if (!isAllUtilitiesSelected) {
      setValue('isAllUtilitiesSelected', true);
      setValue(
        'utilities',
        utilitiesNames.reduce((res, name) => {
          res[name] = true;
          return res;
        }, {}) as any
      );
      const utilityBadges: IFilterBadge[] = [];
      utilitiesNames.forEach((name) => {
        const field = `utilities:${name}`;
        const badge = {
          value: field,
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
      onUpdateFilters({ page: 1, utilities: utilitiesNames.join(',') });
    }
  };

  return (
    <AccordionItem
      title={'Utility'}
      defaultOpen
      size={'s'}
      color={'default'}
      className={styles['subAccordion']}
    >
      <CheckBox
        color='primary'
        className={styles.checkBox}
        id={uuid()}
        text='All'
        defaultChecked={false}
        {...register('isAllUtilitiesSelected')}
        onClick={handleSelectAll}
      />
      {redeemOptions && redeemOptions.length > 0 && (
        <div className={styles.collapsedBlock}>
          <div className={styles.reedeem}>
            <div
              className={cn(styles.square, { [styles.collapsed]: !isOpen })}
              onClick={() => setIsOpen((prev) => !prev)}
            />
            <div
              className={styles.squareText}
              onClick={() => setIsOpen((prev) => !prev)}
            >
              Reedeemble
            </div>
          </div>
          <div className={cn(styles.content, { [styles.hidden]: !isOpen })}>
            {redeemOptions?.map((name) => (
              <CheckBox
                color='primary'
                className={styles.checkBox}
                key={name}
                id={uuid()}
                text={name}
                defaultChecked={false}
                {...register(`utilities.${name}`)}
              />
            ))}
          </div>
        </div>
      )}
      <CheckBox
        color='primary'
        className={styles.checkBox}
        id={uuid()}
        text='Activatable'
        defaultChecked={false}
        {...register('utilities.ACTIVATABLE')}
      />
      <CheckBox
        color='primary'
        className={styles.checkBox}
        id={uuid()}
        text='None'
        defaultChecked={false}
        {...register('utilities.none')}
      />
    </AccordionItem>
  );
};
