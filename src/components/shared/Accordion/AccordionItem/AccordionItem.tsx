import { FC, useState } from 'react';
import styles from './AccordionItem.module.scss';
import cn from 'classnames';
import classNames from 'classnames';

interface IAccordionItemProps {
  title: string;
  defaultOpen?: boolean;
  isFirst?: boolean;
  size?: 's' | 'm' | 'l';
  color?: 'primary' | 'default';
  className?: string;
}

const AccordionItem: FC<IAccordionItemProps> = ({
  title,
  defaultOpen,
  children,
  isFirst,
  className,
  color,
  size,
}) => {
  const [isOpen, setOpen] = useState(defaultOpen);

  const getAccordionClassName = (color?: string, size?: string): string => {
    const btnClass: string = classNames(
      styles['accordion-wrapper'],
      className,
      {
        [styles['accordion-small']]: size === 's',
        [styles['accordion-medium']]: size === 'm',
        [styles['accordion-large']]: size === 'l',
        [styles['accordion-default']]: color === 'default',
        [styles['accordion-primary']]: color === 'primary',
      }
    );
    return btnClass;
  };

  const accordionClassName: string = getAccordionClassName(color, size);
  return (
    <div className={accordionClassName}>
      <div
        className={cn(
          styles['accordion-title'],

          {
            [styles['accordion-first']]: isFirst,
            [styles.open]: isOpen,
          }
        )}
        onClick={() => setOpen(!isOpen)}
      >
        {title}
      </div>
      <div
        className={cn(styles['accordion-item'], {
          [styles.collapsed]: !isOpen,
        })}
      >
        <div className={styles['accordion-content']}>{children}</div>
      </div>
    </div>
  );
};

export default AccordionItem;
