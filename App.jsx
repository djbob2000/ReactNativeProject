import React, { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { useRoute } from './src/router/router';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./src/assets/fonts/Roboto/Roboto-Regular.ttf'),
    'Roboto-Medium': require('./src/assets/fonts/Roboto/Roboto-Medium.ttf'),
    'Roboto-Bold': require('./src/assets/fonts/Roboto/Roboto-Bold.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }

  const router = useRoute();

  return <NavigationContainer>{router}</NavigationContainer>;
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: "#fff",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
});
