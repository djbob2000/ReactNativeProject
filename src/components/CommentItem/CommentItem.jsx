import { StyleSheet, Text, View, Image } from 'react-native';
import { styles } from './CommentItem.styles';
import { formatDate } from '../../services/timeConvert';

export const CommentItem = ({ item, index }) => {
  let isEven = index % 2 === 0;

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
