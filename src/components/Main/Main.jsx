import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { selectAuthStatus } from '../../redux/selectors';

import { useRoute } from '../../router/router';
import { refreshUser } from '../../redux/auth/auth.operations';

export const Main = () => {
  const isAuth = useSelector(selectAuthStatus);

  console.log('isAuth', isAuth);
  const dispatch = useDispatch();

  const routing = useRoute(isAuth);

  useEffect(() => {
    dispatch(refreshUser());
  }, []);

  return <NavigationContainer>{routing}</NavigationContainer>;
};
