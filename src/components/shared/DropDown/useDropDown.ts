import { useRef, useState } from 'react';
import useOutsideClick from '@hooks/useOutsideClick';

const useDropDown = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [show, switchShow] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => {
    if (show) {
      switchShow(false);
      searchValue && setSearchValue('');
    }
  });

  return {
    ref,
    show,
    switchShow,
    setSearchValue,
    searchValue,
  };
};

export default useDropDown;
