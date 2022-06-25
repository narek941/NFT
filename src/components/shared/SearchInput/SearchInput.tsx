/* global JSX*/
import { ForwardedRef, forwardRef, useEffect } from 'react';
import { FieldError } from 'react-hook-form';
import Debounce from 'lodash/debounce';
import FailedInputIcon from 'public/field-icons/failed-input.svg';
import ValidInputIcon from 'public/field-icons/valid-input.svg';
import SearchInputIcon from 'public/field-icons/search.svg';

import styles from './SearchInput.module.scss';
import classNames from 'classnames';
import { useTypedSelector } from '@hooks/useNewTypedSelector';
import { useRouter } from 'next/router';

type errorType = FieldError | null;

interface ISearchInputInput {
  id?: string;
  name?: string;
  placeholder: string;
  error?: errorType;
  maxLength?: number;
  isValid?: boolean;
  size?: 's' | 'm' | 'l';
  className?: string;
  [prop: string]: any;
  onSearch: (value) => void;
  onToggleInput: () => void;
  debounceTime?: number;
  toggleInput?: boolean;
  value?: string;
}

const SearchInput = forwardRef(
  (
    {
      error,
      size,
      maxLength,
      isValid,
      className,
      onSearch,
      debounceTime = 500,
      toggleInput,
      onToggleInput,

      ...props
    }: ISearchInputInput,
    ref: ForwardedRef<HTMLInputElement>
  ): JSX.Element => {
    const { isResetAction } = useTypedSelector((state) => state.filter);
    const router = useRouter();

    useEffect(() => {
      if (router.query['search']) {
        // @ts-ignore
        ref.current.value = router.query['search'];
      }
    }, []);

    useEffect(() => {
      if (isResetAction && ref) {
        // @ts-ignore
        ref.current.value = '';
      }
    }, [isResetAction]);

    const getInputClassName = (size?: string): string => {
      const inputClass: string = classNames(
        styles.input,
        toggleInput && styles.toggleInput,
        {
          [styles['input-small']]: size === 's',
          [styles['input-medium']]: size === 'm',
          [styles['input-large']]: size === 'l',
        }
      );
      return inputClass;
    };

    const InputClassName: string = getInputClassName(size);

    return (
      <div
        className={classNames(
          styles.container,
          className && className,
          toggleInput && styles.toggleInput
        )}
      >
        <>
          <div className={styles['search-icon']} onClick={onToggleInput}>
            <SearchInputIcon />
          </div>
          <input
            className={InputClassName}
            type={'search'}
            autoComplete='off'
            maxLength={maxLength}
            ref={ref}
            {...props}
            onChange={Debounce(
              (e) => onSearch({ search: e.target.value }),
              debounceTime
            )}
          />
          {isValid && <ValidInputIcon className={styles['input-icon']} />}
          {error && <FailedInputIcon className={styles['input-icon']} />}
          {error && (
            <span className={styles['input-errorMsg']}>{error.message}</span>
          )}
        </>
      </div>
    );
  }
);

export default SearchInput;
