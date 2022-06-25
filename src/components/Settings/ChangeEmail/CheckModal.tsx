import Copyright from '@components/copyright';
import Modal from '@components/modal';
import ModalWrapper from '@components/ModalWrapper';
import PoweredBy from '@components/PoweredBy';
import Container from '@components/shared/Container';
import { Resend } from '@components/shared/Resend';
import classNames from 'classnames';
import { FC } from 'react';
import styles from './ChangeEmail.module.scss';
import Email from '/public/other/email.svg';

export interface ICheckModalProps {
  getNewEmail: () => string;
}

export const CheckModal: FC<ICheckModalProps> = ({ getNewEmail }) => (
  <Container className={classNames(styles['signIn-wrapper'], styles.container)}>
    <ModalWrapper
      className={classNames(styles['signIn-content'], styles.content)}
    >
      <div className={styles['modal-wrapper']}>
        <div className={styles.media}>
          <Email className={styles.icon} />
        </div>
        <div className={styles.title}>Check your mail</div>
        <div className={styles.confirmText}>
          We have sent a notification email to
        </div>
        <div className={styles.confirmEmail}>
          {getNewEmail() || ' your email'}
        </div>
      </div>
    </ModalWrapper>
    <div className={styles['signin-bottom']}>
      <PoweredBy className={styles.poweredBy} />
      <Copyright />
    </div>
  </Container>
);
