import { CheckModal } from '@components/Settings/ChangeEmail/CheckModal';
import { resetNewEmail } from '@entities/user/redux/actions';
import { useTypedSelector } from '@hooks/useNewTypedSelector';
import { useRouter } from 'next/router';
import { useLayoutEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const EmailChangeConfirmationSentPage = () => {
  const { user } = useTypedSelector((state) => state.user);
  const router = useRouter();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    if (!user || !user.newEmail) {
      console.error('cannot get new user email');
      router.push('/');
    }
    return () => {
      dispatch(resetNewEmail());
    };
  }, []);

  const getNewEmail = () => user?.newEmail || '';

  if (!getNewEmail()) {
    return null;
  }

  return <CheckModal getNewEmail={getNewEmail} />;
};

export default EmailChangeConfirmationSentPage;
