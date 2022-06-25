/* global JSX*/
import ModalTitle from '@shared/ModalTitle';
import Link from 'next/link';

import styles from './NotSupportedBrowser.module.scss';

export default function NotSupportedBrowser(): JSX.Element {
  return (
    <div className={styles.general}>
      <ModalTitle text={'Connect to MetaMask:'} />
      <div>
        <p>Seems your browser do not support MetaMask.</p>
        <p>
          Please check compatability{' '}
          <Link href='https://metamask.io/download/'>
            <a>here</a>
          </Link>
        </p>
      </div>
    </div>
  );
}
