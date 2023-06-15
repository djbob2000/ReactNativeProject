import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export const PostsList = ({ item, onCommentsPress, onMapPress }) => {
  return (
    <View style={styles.postItemContainer}>
      <View style={styles.postItemImgContainer}>
        <Image source={{ uri: item.img }} style={styles.postItemImg} />
      </View>
      <Text style={styles.postItemTitle}>{item.title}</Text>
      <View style={styles.postItemInfoContainer}>
        <View style={styles.postItemRateContainer}>
          <TouchableOpacity
            style={styles.postItemCommentWrap}
            onPress={onCommentsPress}
          >
            {item.comments?.length === 0 ? (
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
              {item.comments ? item.comments.length : 0}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.postItemLikeWrap}>
            <AntDesign name="like2" size={18} color="#FF6C00" />
            <Text style={styles.postItemLikeCount}>
              {item.likes ? item.likes : 0}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.postItemLocationWrap}
          onPress={onMapPress}
        >
          <Feather name="map-pin" size={24} color="#BDBDBD" />
          <Text style={styles.postItemLocationText}>{item.location}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
