import { FC } from 'react';
import AccordionItem from './AccordionItem';
import styles from './Accordion.module.scss';
import ScrollingWrapper from '@shared/ScrollingWrapper';

export interface IAccordionProps {
  data: { title: string; content: any }[];
  size?: 's' | 'm' | 'l';
  color?: 'default' | 'primary';
}

const Accordion: FC<IAccordionProps> = ({ data, size, color }) => {
  return (
    <div className={styles.wrapper}>
      <ScrollingWrapper
        color='light'
        size='l'
        className={styles['height-large']}
      >
        {data.map((item, ind) => {
          return (
            <AccordionItem
              key={ind}
              title={item.title}
              size={size}
              color={color}
            >
              {item.content}
            </AccordionItem>
          );
        })}
      </ScrollingWrapper>
    </div>
  );
};

export default Accordion;
