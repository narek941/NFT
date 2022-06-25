import { FC } from 'react';
import classNames from 'classnames';

import styles from './Option.styles.module.scss';
import OptionDefault from '/public/icon-options/option_a.svg';
import { IOption } from '@type/general';
import { ExternalImage } from '../ExternalImage';
import Close from 'public/field-icons/icon-clear.svg';

export const Option: FC<IOption> = ({
  id,
  isActive,
  imageUrl,
  text,
  onClick,
}) => (
  <div
    className={classNames(styles['wrapper'], isActive && styles.active)}
    onClick={onClick(id)}
  >
    {imageUrl ? (
      <ExternalImage src={imageUrl} className={styles['image']} />
    ) : (
      <OptionDefault className={styles['icon-option']} />
    )}
    <div className={classNames(styles.text, isActive && styles.isActiveText)}>
      {text}
    </div>
    {isActive && <Close className={styles['icon-close']} />}
  </div>
);
