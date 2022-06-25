import { useRouter } from 'next/router';
import ModalTitle from '@shared/ModalTitle';
import { useTypedSelector } from '@hooks/useNewTypedSelector';
import { isServer } from 'src/common/utils/common';

const Profile = () => {
  const { userType } = useTypedSelector((state) => state.auth);
  const router = useRouter();

  if (userType !== 'authorized' && !isServer) {
    router.replace('/signin');
  }
  return <ModalTitle text={"User's Profile"} />;
};

export default Profile;
