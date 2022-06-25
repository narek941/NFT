import { FC } from 'react';
import { BeatLoader } from 'react-spinners';
import cn from 'classnames';
import styles from './Spinner.module.scss';

interface ISpinner {
  size?: number;
  speedMultiplier?: number;
  margin?: number;
  className?: string;
  isFullScreen?: boolean;
  isLoading?: boolean;
}

const FullScreenWrapper: FC = ({ children }) => {
  return (
    <>
      <div className={styles.spinnerBackdrop} />
      <div className={styles.spinnerContainer}>{children}</div>
    </>
  );
};

export const Spinner: FC<ISpinner> = (props) => {
  const {
    size = props.isFullScreen ? 35 : 20,
    speedMultiplier = 1,
    margin = 10,
    className,
    isFullScreen,
    isLoading = true,
  } = props;

  if (!isLoading) {
    return null;
  }

  return isFullScreen ? (
    <FullScreenWrapper>
      <span className={cn(styles.spinnerWrapper, className)}>
        <BeatLoader
          loading
          margin={margin}
          size={size}
          speedMultiplier={speedMultiplier}
        />
      </span>
    </FullScreenWrapper>
  ) : (
    <span className={cn(styles.spinnerWrapper, className)}>
      <BeatLoader
        loading
        margin={margin}
        size={size}
        speedMultiplier={speedMultiplier}
      />
    </span>
  );
};
