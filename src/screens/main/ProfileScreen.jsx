import React, { useEffect, useState } from 'react';

import { useIsFocused } from '@react-navigation/native';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {
  selectAuthLogin,
  selectAuthEmail,
  selectAuthUserId,
} from '../../redux/selectors';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useDispatch, useSelector } from 'react-redux';
import { authSignOut } from '../../redux/auth/auth.slice';
import BackgroundImage from '../../assets/images/background/bg.jpg';
import avatarImage from '../../assets/images/avatar/sample-avatar.jpg';
import mapIcon from '../../assets/icons/map.png';
import messageIcon from '../../assets/icons/message.png';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { PostItem } from '../../components/PostItem/PostItem';

export const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const userLogin = useSelector(selectAuthLogin);
  const userEmail = useSelector(selectAuthEmail);
  const userId = useSelector(selectAuthUserId);

  const [showPhoto, setShowPhoto] = useState(false);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const getUserPosts = async () => {
      try {
        const querySnapshot = await getDocs(
          query(collection(db, 'posts'), where('userId', '==', userId))
        );

        const userPosts = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          postId: doc.id,
        }));

        const sortedUserPosts = userPosts.sort(
          (a, b) => b.timestamp - a.timestamp
        );

        setUserPosts(sortedUserPosts);
      } catch (error) {
        console.log(error.message);
      }
    };

    getUserPosts();
  }, [isFocused]);

  const handleLogOut = () => {
    dispatch(authSignOut());
    console.log('>>>>LogOut clicked');
  };

  return (
    <ImageBackground style={styles.background} source={BackgroundImage}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.avatarWrapper}>
            <Image
              style={styles.avatarImage}
              source={showPhoto ? avatarImage : null}
            />
            <TouchableOpacity
              onPress={() => setShowPhoto(!showPhoto)}
              style={{
                width: 25,
                height: 25,
                position: 'absolute',
                bottom: 14,
                left: showPhoto ? 100 : 107,
              }}
            >
              <Image
                style={{
                  flex: 1,
                  width: showPhoto ? 37 : 25,
                  height: showPhoto ? 37 : 25,
                  resizeMode: 'cover',
                }}
                source={
                  showPhoto
                    ? require('../../assets/icons/remove.png')
                    : require('../../assets/icons/add.png')
                }
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{ padding: 14, alignSelf: 'flex-end' }}
            onPress={handleLogOut}
          >
            <Ionicons name="ios-exit-outline" size={38} color="#BDBDBD" />
          </TouchableOpacity>
          <Text style={{ ...styles.title, marginTop: 33, marginBottom: 32 }}>
            {userLogin}
          </Text>
          <FlatList
            keyExtractor={(item, index) =>
              item.postId ? item.postId : index.toString()
            }
            data={userPosts}
            renderItem={({ item }) => (
              <PostItem item={item} navigation={navigation} />
            )}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: 'cover' },
  container: {
    position: 'relative',
    flex: 1,
    marginTop: 147,
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    // justifyContent: "center",
    alignItems: 'center',
  },
  avatarWrapper: {
    width: 120,
    height: 120,
    borderRadius: 16,
    // overflow: "hidden",
    backgroundColor: '#F6F6F6',
    position: 'absolute',
    top: -50,
    left: 150,
    zIndex: 100,
  },
  avatarImage: {
    width: 120,
    height: 120,
    borderRadius: 16,
    flex: 1,
    resizeMode: 'cover',
    // position: "absolute",
  },
  title: {
    fontSize: 30,
    lineHeight: 35,
    fontWeight: '500',
  },
  text: {
    fontSize: 16,
    color: '#212121',
  },
});
