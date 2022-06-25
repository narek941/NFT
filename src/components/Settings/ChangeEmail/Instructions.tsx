import { FC } from 'react';
import styles from './ChangeEmail.module.scss';
import list from '@styles/components/list.module.scss';
import TextHelper from '@components/shared/TextHelper';

export const Instructions: FC = () => (
  <TextHelper className={styles['textHelper-small']}>
    <>
      <div className={styles['textHelper-heading']}>
        How to change email address:
      </div>
      <ol className={list.listNumbers}>
        <li>Enter current password from your Niftables account</li>
        <li>If entered password is valid, you will see success message</li>
        <li>
          In the new field enter your new email address and click Confirm.
        </li>
        <li>You will get a confirmation email to your new address.</li>
        <li>
          Follow the link from the email to confirm your new email address.
        </li>
      </ol>
    </>
  </TextHelper>
);
