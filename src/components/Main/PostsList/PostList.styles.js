import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  postItemContainer: {
    marginBottom: 34,
  },
  postItemImgContainer: {
    width: '100%',
    height: 240,
  },
  postItemImg: {
    width: '100%',
    flex: 1,
    resizeMode: 'cover',
    borderRadius: 16,
  },
  postItemTitle: {
    marginTop: 8,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#212121',
  },
  postItemInfoContainer: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  postItemRateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postItemCommentWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postItemCommentsCount: {
    marginLeft: 8,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
  },
  postItemLikeWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 27,
  },
  postItemLikeCount: {
    marginLeft: 10,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#212121',
  },
  postItemLocationWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postItemLocationText: {
    marginLeft: 8,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
