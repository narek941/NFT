import { ISearch } from '@type/general';
import styles from './Search.module.scss';

const Search = ({ handleChange, searchValue }: ISearch) => {
  return (
    <div className={styles.searchWrapper}>
      <input
        type='text'
        placeholder='Search...'
        value={searchValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default Search;
