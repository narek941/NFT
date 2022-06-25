import PopUpTerms from '@components/PopUpTerms';
import Link from 'next/link';
import { useState } from 'react';

import styles from './FooterTermsLinks.module.scss';

export default function FooterTermsLinks() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [type, setType] = useState<string>('terms');

  const handleAcceptTermsClick = (type: string) => {
    setType(type);
    setShowModal(!showModal);
  };

  return (
    <>
      <div className={styles['footer-terms']}>
        <span
          role='button'
          className={styles['terms-links']}
          onClick={() => handleAcceptTermsClick('privacy')}
        >
          Privacy Policy
        </span>
        <span
          role='button'
          className={styles['terms-links']}
          onClick={() => handleAcceptTermsClick('terms')}
        >
          Terms and conditions
        </span>
      </div>
      <PopUpTerms
        onClose={handleAcceptTermsClick}
        isShow={showModal}
        showText={type}
      />
    </>
  );
}
