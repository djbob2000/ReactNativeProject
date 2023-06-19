import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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
import { useIsFocused } from '@react-navigation/native';

import { db, storage } from '../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { selectAuthLogin, selectAuthEmail } from '../../redux/selectors';
import { PostItem } from '../../components/PostItem/PostItem';

export const PostsScreen = ({ route, navigation }) => {
  const userLogin = useSelector(selectAuthLogin);
  const userEmail = useSelector(selectAuthEmail);
  const isFocused = useIsFocused();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'posts'));
        const allPosts = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          postId: doc.id,
        }));
        const sortedPosts = allPosts.sort((a, b) => b.timestamp - a.timestamp);
        setPosts(sortedPosts);
      } catch (error) {
        console.log(error.message);
      }
    };

    getAllPosts();
  }, [isFocused]);

  if (!posts) {
    return null;
  }
  return (
    <View style={{ ...styles.container }}>
      <SafeAreaView style={{ flex: 1, width: '100%' }}>
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
            source={require('../../assets/images/avatar/sample-avatar.jpg')}
          />

          <View>
            <Text style={styles.title}>{userLogin}</Text>
            <Text style={styles.email}>{userEmail}</Text>
          </View>
        </View>

        <FlatList
          keyExtractor={(item, index) =>
            item.postId ? item.postId : index.toString()
          }
          data={posts}
          renderItem={({ item }) => (
            <PostItem item={item} navigation={navigation} />
          )}
        />
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
    width: '100%',
  },
  title: {
    fontFamily: 'Roboto-Bold',
    fontStyle: 'normal',
    fontSize: 13,
    color: '#212121',
    lineHeight: 15,
  },
  email: {
    fontFamily: 'Roboto-Regular',
    fontStyle: 'normal',
    fontSize: 11,
    color: '#212121',
    lineHeight: 13,
    opacity: 0.8,
  },
  text: {
    fontSize: 16,
    lineHeight: 18.75,
    fontWeight: '400',
    color: '#212121CC',
  },
});
