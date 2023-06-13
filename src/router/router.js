import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { HomeScreen } from '../screens/main/HomeScreen';
import { CreatePostsScreen } from '../screens/main/CreatePostsScreen';
import { ProfileScreen } from '../screens/main/ProfileScreen';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthStatus } from '../redux/selectors';
import { authSignOut } from '../redux/auth/auth.slice';

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

export const useRoute = (stateChange = false) => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(authSignOut());
  };

  if (!stateChange) {
    return (
      <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={RegisterScreen}
        />
      </AuthStack.Navigator>
    );
  }

  //else
  return (
    <MainTab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        showLabel: false,
        tabBarStyle: {
          height: 83,
          backgroundColor: '#fff',
        },
      }}
      NavigatorContainerStyle={styles.NavigatorStyle}
    >
      <MainTab.Screen
        options={({ route, navigation }) => ({
          headerShown: false,
          tabBarActiveTintColor: '#FF6C00',

          headerRight: props => (
            <TouchableOpacity
              style={styles.exitButton}
              onPress={() => handleLogout()}
            >
              <Ionicons name="ios-exit-outline" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons name="ios-grid-outline" size={size} color={color} />
          ),
          tabBarLabelStyle: { display: 'none' },
        })}
        name="HomeScreen"
        component={HomeScreen}
      />

      <MainTab.Screen
        options={({ navigation, route }) => ({
          tabBarStyle: { display: 'none' },
          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              size={24}
              color="#000"
              style={{ marginLeft: 16 }}
              onPress={() => navigation.goBack()}
            />
          ),
          tabBarIcon: ({ focused, size, color }) =>
            focused ? (
              <Text
                onPress={() => console.log(route)}
                style={styles.focusedTextStyle}
              >
                <Ionicons
                  name="ios-trash-outline"
                  size={size}
                  color={'#BDBDBD'}
                />
              </Text>
            ) : (
              <Text style={styles.unfocusedTextStyle}>
                <Ionicons name="ios-add" size={size} color={'#fff'} />
              </Text>
            ),
          tabBarLabelStyle: { display: 'none' },
        })}
        name="CreatePosts"
        component={CreatePostsScreen}
      />

      <MainTab.Screen
        options={{
          tabBarActiveTintColor: '#FF6C00',
          tabBarLabelStyle: { display: 'none' },
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};

const styles = StyleSheet.create({
  NavigatorStyle: {
    backgroundColor: '#fff',
  },
  exitButton: { marginRight: 16 },
  focusedTextStyle: {
    backgroundColor: '#F6F6F6',
    overflow: 'hidden',
    borderRadius: 20,
    width: 70,
    height: 40,
    padding: 7,
    textAlign: 'center',
  },
  unfocusedTextStyle: {
    backgroundColor: '#FF6C00',
    overflow: 'hidden',
    borderRadius: 20,
    width: 70,
    height: 40,
    padding: 7,
    textAlign: 'center',
  },
});
