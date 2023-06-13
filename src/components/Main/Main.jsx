import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { selectAuthStatus } from '../../redux/selectors';

import { useRoute } from '../../router/router';
import { authChangeStatus } from '../../redux/auth/auth.operations';

export const Main = () => {
  const stateChange = useSelector(selectAuthStatus);
  console.log('🚀 ~ file: Main.jsx:11 ~ Main ~ stateChange:', stateChange);

  const dispatch = useDispatch();

  const routing = useRoute(stateChange);

  useEffect(() => {
    dispatch(authChangeStatus());
  }, []);

  return <NavigationContainer>{routing}</NavigationContainer>;
};
