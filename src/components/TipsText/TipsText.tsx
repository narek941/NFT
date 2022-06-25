/* global JSX*/
import classNames from 'classnames';
import Link from 'next/link';

import styles from './TipsText.module.scss';

interface ITipsText {
  text?: string;
  linkText?: string;
  className?: string;
  linkTo?: string;
}

export default function TipsText({
  text,
  linkText,
  linkTo,
  className,
}: ITipsText): JSX.Element {
  return (
    <div className={classNames(styles.general, className)}>
      {text && <span className={styles.text}>{text} </span>}{' '}
      {linkText && linkTo && (
        <Link href={linkTo}>
          <a className={classNames(styles.link, className)}>{linkText}</a>
        </Link>
      )}
    </div>
  );
}
