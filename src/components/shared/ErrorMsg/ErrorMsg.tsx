/* global JSX*/
import styles from './ErrorMsg.module.scss';

interface IErrorMsg {
  errorText: string;
}

export default function ErrorMsg({ errorText }: IErrorMsg): JSX.Element {
  return <p className={styles.errorMessage}>{errorText}</p>;
}
