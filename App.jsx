import React, { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import 'react-native-gesture-handler';

import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { Main } from './src/components/Main/Main';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./src/assets/fonts/Roboto/Roboto-Regular.ttf'),
    'Roboto-Medium': require('./src/assets/fonts/Roboto/Roboto-Medium.ttf'),
    'Roboto-Bold': require('./src/assets/fonts/Roboto/Roboto-Bold.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
