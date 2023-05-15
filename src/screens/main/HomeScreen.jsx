import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PostsScreen } from "../nested/PostsScreen";
import { CommentsScreen } from "../nested/CommentsScreen";
import { MapScreen } from "../nested/MapScreen";

const NestedScreen = createStackNavigator();

export const PostsScreen = () => {
  const handleLogOut = () => {
    console.log(">>>>LogOut clicked");
  };

  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="DefaultScreen"
        component={DefaultScreenPosts}
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={handleLogOut} style={styles.exitButton}>
              <Ionicons name="ios-exit-outline" size={38} color="#BDBDBD" />
            </TouchableOpacity>
          ),
        }}
      />

      <NestedScreen.Screen name="Comments" component={CommentsScreen} />

      <NestedScreen.Screen name="Map" component={MapScreen} />
    </NestedScreen.Navigator>
  );
};

const styles = StyleSheet.create({
  exitButton: {
    paddingRight: 16,
  },
});