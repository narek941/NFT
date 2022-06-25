import React, { FC, useState, useEffect } from 'react';
import classNames from 'classnames';
import styles from './DropDown.module.scss';
import useDropDown from './useDropDown';
import Icon from '/public/other/arrowDown.svg';
import { IDropDown, IDropDownItem } from '@type/general';
import Search from '../Search';

const DropDown: FC<IDropDown> = ({
  options,
  right,
  selectedOptions,
  icon,
  userText,
  showSearch,
  isLoading,
  usingValue,
  className,
  isBorder,
  handleClick,
  handleSelectedValue,
}) => {
  const tagsRegex = /<[^>]+>/g;
  const [selectedOption, setSelectedOption] = useState<
    string | React.ReactElement
  >(selectedOptions || '');
  const [activeId, setActiveId] = useState<string | number | null>(null);
  const [searchResults, setSearchResults] = useState<IDropDownItem[]>(options);

  const { ref, switchShow, show, setSearchValue, searchValue } = useDropDown();

  useEffect(() => {
    setSearchResults(options);
  }, [options]);

  const onOptionClicked =
    (value: string | React.ReactElement, id: number | string, name) => () => {
      setSelectedOption(name && !usingValue ? name : value);

      switchShow(false);
      searchValue && setSearchValue('');

      const activeElement = options.find((option) => {
        return option.id === id;
      });

      activeElement && setActiveId(id);

      handleClick?.(value.toString(), name);

      handleSelectedValue && handleSelectedValue(name);
    };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    const searchValueLowerCase = searchValue.toLowerCase();

    const results = options.filter((option) => {
      const strValue = (option.name ?? option.value)
        .toString()
        .replaceAll(tagsRegex, '')
        .toLowerCase();

      return strValue.includes(searchValueLowerCase);
    });

    setSearchResults(results);
  }, [searchValue]);

  useEffect(() => {
    setSelectedOption(selectedOptions || '');
  }, [selectedOptions]);

  const handleToggle = () => switchShow(!show);

  const defaultText = <div>{userText || 'Example...'}</div>;

  const dropDowClassName: string = classNames(
    styles.dropDownWrapper,
    className
  );
  return (
    <div className={dropDowClassName}>
      <div
        className={classNames([
          styles.dropDownHeader,
          show && styles.show,
          isBorder && styles['dropDown-border'],
        ])}
        onClick={handleToggle}
      >
        {selectedOption ? (
          <div className={styles.selectedOption}>{selectedOption}</div>
        ) : (
          defaultText
        )}

        {icon && <Icon className={styles['icon-arrow']} />}
      </div>
      <div
        className={classNames([
          styles['dropDown-sort'],
          styles.dropDownList,
          show && styles.show,
          right && styles['dropDown-right'],
        ])}
        ref={ref}
      >
        {showSearch && (
          <div className={styles.dropDownListSearch}>
            <Search handleChange={handleChange} searchValue={searchValue} />
          </div>
        )}
        {searchResults.length ? (
          <div className={classNames(styles.scrollingWrapper, 'p-0')}>
            {searchResults.map((option, id) => {
              return (
                <div
                  className={classNames([
                    styles.item,
                    option.id === activeId && styles.isActive,
                  ])}
                  key={id}
                  onClick={onOptionClicked(
                    option.name,
                    option.id,
                    option.value
                  )}
                >
                  {option.name}
                </div>
              );
            })}
          </div>
        ) : (
          <>
            {isLoading ? (
              <div>Loader</div>
            ) : (
              <div className={styles.noOptions}>no matching options</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DropDown;
