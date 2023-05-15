import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-MainTab";
import { Ionicons } from "@expo/vector-icons";

import { RegisterScreen } from "../screens/auth/RegisterScreen";
import { LoginScreen } from "../screens/auth/LoginScreen";
import { PostsScreen } from "../screens/main/HomeScreen";
import { CreatePostsScreen } from "../screens/main/CreatePostsScreen";
import { ProfileScreen } from "../screens/main/ProfileScreen";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

export const useRoute = () => {
  if (0) {
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
      initialRouteName="Posts"
      tabBarOptions={{ showLabel: false }}
      sceneContainerStyle={styles.sceneStyle}
    >
      <MainTab.Screen
        options={({ route, navigation }) => ({
          headerShown: false,
          tabBarActiveTintColor: "#FF6C00",
          headerRight: (props) => (
            <TouchableOpacity
              style={styles.exitButton}
              onPress={() => console.log(route)}
            >
              <Ionicons name="ios-exit-outline" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons name="ios-grid-outline" size={size} color={color} />
          ),
        })}
        name="Posts"
        component={PostsScreen}
      />

      <MainTab.Screen
        options={({ route }) => ({
          tabBarIcon: ({ focused, size, color }) =>
            focused ? (
              <Text
                onPress={() => console.log(route)}
                style={styles.focusedTextStyle}
              >
                <Ionicons
                  name="ios-trash-outline"
                  size={size}
                  color={"#BDBDBD"}
                />
              </Text>
            ) : (
              <Text style={styles.unfocusedTextStyle}>
                <Ionicons name="ios-add" size={size} color={"#fff"} />
              </Text>
            ),
        })}
        name="CreatePosts"
        component={CreatePostsScreen}
      />

      <MainTab.Screen
        options={{
          tabBarActiveTintColor: "#FF6C00",
          headerShown: false,
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
  sceneStyle: {
    backgroundColor: "#fff",
  },
  exitButton: { marginRight: 16 },
  focusedTextStyle: {
    backgroundColor: "#F6F6F6",
    overflow: "hidden",
    borderRadius: 20,
    width: 70,
    height: 40,
    padding: 7,
    textAlign: "center",
  },
  unfocusedTextStyle: {
    backgroundColor: "#FF6C00",
    overflow: "hidden",
    borderRadius: 20,
    width: 70,
    height: 40,
    padding: 7,
    textAlign: "center",
  },
});
