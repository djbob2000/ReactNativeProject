import React, { useEffect, useState } from 'react';

import {
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  View,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import avatarImage from '../../assets/images/avatar/sample-avatar.jpg';
import messageIcon from '../../assets/icons/message.png';
import mapIcon from '../../assets/icons/map.png';
import { posts } from '../sample.data';

export const PostsScreen = ({ route, navigation }) => {
  // const { width } = useWindowDimensions();

  return (
    <View style={{ ...styles.container }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ ...styles.container }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 32,
              marginBottom: 32,
              marginRight: 'auto',
            }}
          >
            <Image
              style={{
                width: 60,
                height: 60,
                resizeMode: 'cover',
                borderRadius: 16,
                marginRight: 8,
              }}
              source={avatarImage}
            />

            <View>
              <Text style={styles.title}>{posts.login}</Text>
              <Text style={{ ...styles.text, fontSize: 11 }}>
                {posts.email}
              </Text>
            </View>
          </View>

          <FlatList
            keyExtractor={item => item.id}
            data={posts}
            renderItem={({ item }) => (
              <View style={{ marginBottom: 34 }}>
                <Image
                  style={{
                    width: 360,
                    height: 240,
                    marginBottom: 8,
                    borderRadius: 8,
                  }}
                  source={item.photo}
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
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('Comments', {
                        ...item,
                      })
                    }
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <Image
                      style={{
                        width: 18,
                        height: 18,
                        marginRight: 9,
                        resizeMode: 'contain',
                      }}
                      source={messageIcon}
                    />
                    <Text
                      style={{
                        ...styles.text,
                        color: '#BDBDBD',
                      }}
                    >
                      17
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}
                    onPress={() =>
                      navigation.navigate('Map', {
                        ...item,
                      })
                    }
                  >
                    <Image
                      style={{
                        width: 18,
                        height: 18,
                        marginRight: 9,
                        resizeMode: 'contain',
                      }}
                      source={mapIcon}
                    />
                    <Text
                      style={{
                        ...styles.text,
                        color: '#212121',
                        textDecorationLine: 'underline',
                      }}
                    >
                      {item.regionPhoto}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
  },
  text: {
    fontSize: 16,
    lineHeight: 18.75,
    fontWeight: '400',
    color: '#212121CC',
  },
});
