import React, { useEffect } from 'react';

import { useTypedSelector } from '@hooks/useNewTypedSelector';

import { userInfoRequest } from '@entities/user/redux/actions';
import { useDispatch } from 'react-redux';
import { isServer } from 'src/common/utils/common';

import HomePage from '@components/HomePage';

const Home = () => {
  const dispatch = useDispatch();
  const { userType } = useTypedSelector((state) => state.auth);

  useEffect(() => {
    if (!isServer) {
      setTimeout(() => {
        if (userType === 'authorized') {
          dispatch(userInfoRequest({}));
        }
      }, 1000);
    }
  }, [userType]);

  return <HomePage userType={userType} />;
};

export default Home;
