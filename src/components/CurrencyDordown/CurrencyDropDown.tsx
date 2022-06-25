import DropDown from '@components/shared/DropDown';
import { currencyOptions } from './CurrencyDropDown.helper';
import styles from './CurrencyDropDown.module.scss';

const CurrencyDropDown = () => {
  return (
    <div className={styles.currency}>
      {/*temporary code*/}
      Currency:
      <DropDown
        className={styles['currency-dropDown']}
        usingValue={true}
        options={currencyOptions}
        selectedOptions={'USD'}
        icon={true}
      />
    </div>
  );
};

export default CurrencyDropDown;
