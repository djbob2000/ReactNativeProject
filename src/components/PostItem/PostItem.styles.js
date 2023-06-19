import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  postItemContainer: {
    flex: 1,
    marginBottom: 34,
    width: '100%',
  },
  postItemImgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 240,
    marginBottom: 8,
    // overflow: 'hidden',
  },
  postItemImg: {
    width: '100%',
    height: '100%',
    borderRadius: 8,

    resizeMode: 'cover',
  },
  postItemTitle: {
    marginBottom: 8,
    fontFamily: 'Roboto-Medium',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 19,
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
