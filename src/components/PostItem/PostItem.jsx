import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { styles } from './PostItem.styles';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { commentsCounter } from '../../services/commentsCounter';

export const PostItem = ({ item, navigation }) => {
  console.log(
    '🚀 ~ file: PostItem.jsx:9 ~ PostItem ~ navigation.navigate:',
    navigation.navigate
  );
  console.log('🚀 ~ file: PostItem.jsx:9 ~ PostItem ~ item:', item);
  const [like, setLike] = useState(0);
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    const fetchCommentCount = async () => {
      try {
        const currCommentsCount = await commentsCounter(item.postId);
        setCommentCount(currCommentsCount);
        console.log(
          '🚀 ~ file: PostItem.jsx:26 ~ fetchCommentCount ~ currCommentsCount:',
          currCommentsCount
        );
      } catch (error) {
        console.log('Error fetching comment count:', error.message);
      }
    };

    fetchCommentCount();
  }, [item.postId]);

  return (
    <View style={styles.postItemContainer}>
      <View style={styles.postItemImgContainer}>
        <Image source={{ uri: item.photo }} style={styles.postItemImg} />
      </View>
      <Text style={styles.postItemTitle}>{item.title}</Text>
      <View style={styles.postItemInfoContainer}>
        <View style={styles.postItemRateContainer}>
          <TouchableOpacity
            style={styles.postItemCommentWrap}
            activeOpacity={0.7}
            onPress={() =>
              navigation.navigate('Comments', {
                ...item,
              })
            }
          >
            {commentCount !== 0 ? (
              <Ionicons name="ios-chatbubble" size={18} color="#FF6C00" />
            ) : (
              <Ionicons
                name="md-chatbubble-outline"
                size={18}
                color="#BDBDBD"
              />
            )}

            <Text
              style={{
                ...styles.postItemCommentsCount,
                color: item.comments?.length === 0 ? '#BDBDBD' : '#212121',
                color: '#212121',
              }}
            >
              {commentCount ? commentCount : 0}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setLike(1)}
            style={styles.postItemLikeWrap}
          >
            <AntDesign name="like2" size={18} color="#FF6C00" />
            <Text style={styles.postItemLikeCount}>{like}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.postItemLocationWrap}
          onPress={() =>
            navigation.navigate('Map', {
              ...item,
            })
          }
        >
          <Feather name="map-pin" size={24} color="#BDBDBD" />
          <Text style={styles.postItemLocationText}>{item.regionPhoto}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
