import React from 'react';
import { useRef, useState } from 'react';
import useOutsideClick from '@hooks/useOutsideClick';

const useHeader = () => {
  const [show, switchShow] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => {
    if (show) {
      switchShow(false);
    }
  });

  return {
    ref,
    show,
    switchShow,
  };
};

export default useHeader;
