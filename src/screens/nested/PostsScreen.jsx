import React, { useEffect, useState } from "react";

import {
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import avatarImage from "../../assets/images/avatar/sample-avatar.jpg";
import messageIcon from "../../assets/icons/message.png";
import mapIcon from "../../assets/icons/map.png";

export const PostsScreen = ({ route, navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ ...styles.container }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 32,
            marginBottom: 32,
            // backgroundColor: "red",
          }}
        >
          <View
            style={{ borderRadius: 16, overflow: "hidden", marginRight: 8 }}
          >
            <Image
              style={{ width: 60, height: 60, resizeMode: "cover" }}
              source={avatarImage}
            />
          </View>
          <View>
            <Text style={styles.title}>{login}</Text>
            <Text style={{ ...styles.text, fontSize: 11 }}>{email}</Text>
          </View>
        </View>

        <FlatList
          data={""}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 34 }}>
              <Image
                style={{
                  height: 240,
                  marginBottom: 8,
                  borderRadius: 8,
                }}
                source={{ uri: item.photo }}
              />
              <Text
                style={{
                  ...styles.title,
                  marginBottom: 11,
                }}
              >
                {item.name}
              </Text>
              <View
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Comments", {
                      ...item,
                    })
                  }
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Image
                    style={{
                      width: 18,
                      height: 18,
                      marginRight: 9,
                      resizeMode: "contain",
                    }}
                    source={messageIcon}
                  />
                  <Text
                    style={{
                      ...styles.text,
                      color: "#BDBDBD",
                    }}
                  >
                    0
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                  onPress={() =>
                    navigation.navigate("Map", {
                      ...item,
                    })
                  }
                >
                  <Image
                    style={{
                      width: 18,
                      height: 18,
                      marginRight: 9,
                      resizeMode: "contain",
                    }}
                    source={mapIcon}
                  />
                  <Text
                    style={{
                      ...styles.text,
                      color: "#212121",
                      textDecorationLine: "underline",
                    }}
                  >
                    {item.regionName}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 13,
    fontWeight: "700",
  },
  text: {
    fontSize: 16,
    lineHeight: 18.75,
    fontWeight: "400",
    color: "#212121CC",
  },
});
