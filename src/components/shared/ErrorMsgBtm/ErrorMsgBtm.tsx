/* global JSX*/
import styles from './ErrorMsgBtm.module.scss';
import classNames from 'classnames';

interface IErrorMsgBtm {
  isBigFont?: boolean;
  errorText: string | null;
}

export default function ErrorMsgBtm({
  errorText,
  isBigFont,
}: IErrorMsgBtm): JSX.Element {
  const ErrorMsgClasses = classNames(styles.errorMessage, {
    [styles.errorMessage__bigger]: isBigFont,
  });

  return <p className={ErrorMsgClasses}>{errorText}</p>;
}
