import { IFilterBadge } from '@components/BuyFilterBlock/BuyFilterBlock';
import AccordionItem from '@components/shared/Accordion/AccordionItem';
import Badge from '@components/shared/Badge';
import BadgeList from '@components/shared/Badge/BadgeList';
import classNames from 'classnames';
import { FC } from 'react';

import styles from './AppliedFilters.styles.module.scss';

export interface IAppliedFilters {
  header: string;
  size?: 's' | 'm' | 'l';
  color?: 'primary' | 'default';
  style?: string;
  badges: IFilterBadge[];
  isFirst?: boolean;
  clearAll: () => void;
  className?: string;
}

export const AppliedFilters: FC<IAppliedFilters> = ({
  badges,
  header,
  isFirst,
  size,
  color,
  clearAll,
  className,
}) => {
  return (
    <div className={classNames(styles.wrapper, className)}>
      <AccordionItem
        title={header}
        isFirst={isFirst}
        defaultOpen
        size={size}
        color={color}
        className={styles['accordion']}
      >
        <BadgeList>
          {badges
            .sort((a, b) => a.field.localeCompare(b.field))
            .map((badge) => (
              <Badge
                key={badge.field}
                size='l'
                color='primary'
                iconClose
                onCloseIconClick={badge.onRemove}
              >
                {badge.value}
              </Badge>
            ))}
        </BadgeList>
        {badges.length > 0 && (
          <Badge iconClose onCloseIconClick={clearAll}>
            Clear all
          </Badge>
        )}
      </AccordionItem>
    </div>
  );
};
