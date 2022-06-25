import Container from '@components/shared/Container';
import Section from '@components/shared/Section';
import classNames from 'classnames';
import { FC } from 'react';
import { IYouHaveProps, YouHave } from '../YouHave';
import styles from './CardSection.module.scss';
import CarouselScrollbar from '@components/CarouselScrollbar';

export interface ICardSectionProps extends IYouHaveProps {}

export const CardSection: FC<ICardSectionProps> = ({ className, ...props }) => {
  const sectionClass: string = classNames([styles.section, className]);

  return (
    <Section className={sectionClass}>
      <Container className={styles.container}>
        <div className={classNames(styles['you-have-wrapper'])}>
          <YouHave {...props} />
        </div>
        {props.total != 0 && (
          <CarouselScrollbar className={classNames(styles.myProfileCarousel)}>
            {props.children}
          </CarouselScrollbar>
        )}
      </Container>
    </Section>
  );
};
