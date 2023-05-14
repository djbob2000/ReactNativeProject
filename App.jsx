import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
// import * as Font from "expo-font";
import { useFonts } from "expo-font";
import { Button } from "react-native";

import { StyleSheet, Text, View } from "react-native";
import { RegisterScreen } from "./src/screens/auth/RegisterScreen";
import { LoginScreen } from "./src/screens/auth/LoginScreen";
import * as SplashScreen from "expo-splash-screen";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";

// const loadFonts = async () => {
//   await Font.loadAsync({
//     "Roboto-Regular": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
//     "Roboto-Medium": require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
//     "Roboto-Bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
//   });
// };

const MainStack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./src/assets/fonts/Roboto/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./src/assets/fonts/Roboto/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./src/assets/fonts/Roboto/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  // const [isReady, setIsReady] = useState(false);

  // useEffect(() => {
  //   async function prepare() {
  //     try {
  //       await SplashScreen.preventAutoHideAsync();
  //       await loadFonts();
  //     } catch (error) {
  //       console.warn(error);
  //     } finally {
  //       setIsReady(true);
  //       await SplashScreen.hideAsync();
  //     }
  //   }
  //   prepare();
  // }, []);

  // if (!isReady) {
  //   return null;
  // }

  return (
    <>
      <NavigationContainer>
        <MainStack.Navigator initialRouteName="Login">
          <MainStack.Screen name="Register" component={RegisterScreen} />
          <MainStack.Screen name="Login" component={LoginScreen} />
        </MainStack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: "#fff",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
});
