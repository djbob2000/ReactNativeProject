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
import messageIcon from '../../assets/icons/message.png';
import mapIcon from '../../assets/icons/map.png';
import { db, storage } from '../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { selectAuthLogin, selectAuthEmail } from '../../redux/selectors';
import { commentsCounter } from '../../services/commentsCounter';
import { PostItem } from '../../components/PostItem/PostItem';

export const PostsScreen = ({ route, navigation }) => {
  console.log(
    '🚀 ~ file: PostsScreen.jsx:23 ~ PostsScreen ~ navigation.navigate:',
    navigation.navigate
  );
  const userLogin = useSelector(selectAuthLogin);
  const userEmail = useSelector(selectAuthEmail);
  const isFocused = useIsFocused();
  // const { width } = useWindowDimensions();
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
  console.log('🚀 ~ file: PostsScreen.jsx:23 ~ PostsScreen ~ posts:', posts);
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
              source={require('../../assets/images/avatar/sample-avatar.jpg')}
            />

            <View>
              <Text style={styles.title}>{userLogin}</Text>
              <Text style={{ ...styles.text, fontSize: 11 }}>{userEmail}</Text>
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
