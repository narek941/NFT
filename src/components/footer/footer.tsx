import { useRouter } from 'next/router';

import styles from './footer.module.scss';
import FooterColumn from './FooterColumn';
import Copyright from '../copyright';
import SocialIconsContainer from '../SocialIconsContainer';
import FooterTermsLinks from './FooterTermsLinks';
import Container from '@components/shared/Container';
import PoweredBy from '@components/PoweredBy';

const restrictionPathnames = [
  '/signin',
  '/signup',
  '/signup/activate',
  '/forgot-password',
  '/forgot-password/check-email',
  '/signin/step1',
  '/signin/2fa',
  '/forgot-password/new-password',
  '/forgot-password/success',
  '/maintenance-mode',
  '/email-confirmation',
  '/email-change-confirmation-sent',
  '/email-change-confirmation',
];

export default function Footer() {
  const router = useRouter();

  if (restrictionPathnames.includes(router.pathname)) return null;

  return (
    <footer className={styles.footer}>
      <Container className={styles.container}>
        <div className={styles.inner}>
          <FooterColumn alignContent='left'>
            <PoweredBy />
            <Copyright />
          </FooterColumn>
          <FooterColumn alignContent='center'>
            <SocialIconsContainer />
          </FooterColumn>

          <FooterColumn alignContent='right'>
            <FooterTermsLinks />
          </FooterColumn>
        </div>
      </Container>
    </footer>
  );
}
