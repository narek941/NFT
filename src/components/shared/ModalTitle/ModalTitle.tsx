/* global JSX*/
import classNames from 'classnames';
import styles from './ModalTitle.module.scss';

interface ModalHeadingProps {
  text: string | undefined;
  highLightedText?: string;
  className?: string;
}
export default function ModalTitle({
  text,
  highLightedText,
  className,
}: ModalHeadingProps): JSX.Element {
  const textClasses = classNames(styles.headingStyles, className);

  return (
    <div className={textClasses}>
      {text}{' '}
      {highLightedText && (
        <span className={styles.highLightedTextStyles}> {highLightedText}</span>
      )}
    </div>
  );
}
