import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  itemWrap: {
    marginBottom: 24,
  },
  userPhoto: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  commentWrap: {
    flex: 1,
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  commentText: {
    fontFamily: 'Roboto-Regular',
    color: '#212121',
    fontSize: 13,
  },
  commentDate: {
    marginLeft: 'auto',
    marginTop: 8,
    fontFamily: 'Roboto-Regular',
    fontSize: 10,
    color: '#BDBDBD',
  },
});
