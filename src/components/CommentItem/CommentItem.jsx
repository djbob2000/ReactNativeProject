import { StyleSheet, Text, View, Image } from 'react-native';
import { styles } from './CommentItem.styles';
import { formatDate } from '../../services/timeConvert';

export const CommentItem = ({ item, index }) => {
  console.log('🚀 ~ file: CommentItem.jsx:6 ~ CommentItem ~ index:', index);
  console.log('🚀 ~ file: CommentItem.jsx:6 ~ CommentItem ~ item:', item);
  let isEven = index % 2 === 0;
  console.log('🚀 ~ file: CommentItem.jsx:9 ~ CommentItem ~ isEven:', isEven);

  return (
    <View
      style={{
        ...styles.itemWrap,
        flexDirection: isEven ? 'row' : 'row-reverse',
      }}
    >
      <View>
        <Text>{item.login}</Text>
      </View>
      <View
        style={{
          flex: 1,
          marginLeft: isEven ? 16 : 0,
          marginRight: isEven ? 0 : 16,
          ...styles.commentWrap,
        }}
      >
        <Text style={styles.commentText}>{item.commentText}</Text>
        <Text style={styles.commentDate}>
          {formatDate(item.timestamp.seconds)}
        </Text>
      </View>
    </View>
  );
};

{
  /* <View style={styles.commentContainer}>
  <Text>{item.login}</Text>
  <Text style={styles.comment}>{item.commentText}</Text>
  <Text>{formatDate(item.timestamp.seconds)}</Text>
</View>; */
}
