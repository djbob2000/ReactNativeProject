import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { selectAuthStatus } from '../../redux/selectors';

import { useRoute } from '../../router/router';

export const Main = () => {
  const isAuth = useSelector(selectAuthStatus);

  console.log('isAuth', isAuth);
  const dispatch = useDispatch();

  const routing = useRoute(isAuth);

  return <NavigationContainer>{routing}</NavigationContainer>;
};
