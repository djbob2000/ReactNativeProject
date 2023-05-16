import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import BackgroundImage from "../../assets/images/background/bg.jpg";
import avatarImage from "../../assets/images/avatar/sample-avatar.jpg";
import mapIcon from "../../assets/icons/map.png";
import messageIcon from "../../assets/icons/message.png";

export const ProfileScreen = ({ navigation }) => {
  return (
    <ImageBackground style={styles.background} source={BackgroundImage}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.avatarWrapper}>
            <Image
              style={styles.avatarImage}
              source={showPhoto && avatarImage}
            />
            <TouchableOpacity
              onPress={() => setShowPhoto(!showPhoto)}
              style={{
                position: "absolute",
                width: 25,
                height: 25,
                bottom: 14,
                left: showPhoto ? 100 : 107,
              }}
            >
              <Image
                style={{
                  flex: 1,
                  width: showPhoto ? 37 : 25,
                  height: showPhoto ? 37 : 25,
                  resizeMode: "cover",
                }}
                source={
                  showPhoto
                    ? require("../../assets/icons/remove.png")
                    : require("../../assets/icons/add.png")
                }
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={{ padding: 14, alignSelf: "flex-end" }}>
            <Ionicons name="ios-exit-outline" size={38} color="#BDBDBD" />
          </TouchableOpacity>
          <Text style={{ ...styles.title, marginTop: 33, marginBottom: 32 }}>
            Profile name
          </Text>
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
                    fontSize: 16,
                  }}
                >
                  {item.name}
                </Text>
                <View
                  style={{
                    width: dimensions,
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("Comments", { ...item })
                      }
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginRight: 22,
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
                    <View
                      style={{
                        ...styles.text,
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <AntDesign
                        style={{ marginRight: 10 }}
                        name="like2"
                        size={21}
                        color="#FF6C00"
                      />
                      <Text style={styles.text}>153</Text>
                    </View>
                  </View>
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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: "cover" },
  container: {
    position: "relative",
    flex: 1,
    marginTop: 147,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: "center",
  },
  avatarWrapper: {
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
    position: "absolute",
    top: -50,
    left: 150,
    zIndex: 100,
  },
  avatarImage: {
    width: 120,
    height: 120,
    borderRadius: 16,
    flex: 1,
    resizeMode: "cover",
  },
  title: {
    fontSize: 30,
    lineHeight: 35,
    fontWeight: "500",
  },
  text: {
    fontSize: 16,
    color: "#212121",
  },
});
