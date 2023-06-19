import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
  Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../../firebase/config';
import { selectAuthUserId, selectAuthLogin } from '../../redux/selectors';
import { CommentItem } from '../../components/CommentItem/CommentItem';
import { formatDate } from '../../services/timeConvert';

export const CommentsScreen = ({ route }) => {
  // const textInputRef = useRef(null);
  const userId = useSelector(selectAuthUserId);
  const login = useSelector(selectAuthLogin);
  const { photo, comments, postId } = route.params;

  const [commentText, setCommentText] = useState('');
  const [allComments, setAllComments] = useState([]);

  const getAllComments = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(db, `posts/${postId}/comments`)
      );
      const allComments = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      const sortedComments = allComments.sort(
        (a, b) => b.timestamp - a.timestamp
      );
      setAllComments(sortedComments);
    } catch (error) {
      console.error(
        'Error getAllComments:',
        error.code,
        error.message,
        error.serverResponse
      );
    }
  };

  const addCommentToServer = async () => {
    try {
      const docRef = await addDoc(
        collection(db, `posts/${postId}`, 'comments'),
        {
          commentText,
          login,
          timestamp: serverTimestamp(),
        }
      );
      Keyboard.dismiss();
      /**
       * The setCommentText function is not updating the state of commentText properly. This is because the setCommentText function is asynchronous, and the state update might not happen immediately after calling setCommentText(''). To ensure that the state is properly updated, you can use the useState hook with a callback function instead. Here's the updated code:
       */
      setCommentText(prevCommentText => '');

      // textInputRef.current.clear();

      getAllComments();
    } catch (error) {
      console.error(
        'Error addCommentToServer:',
        error.code,
        error.message,
        error.serverResponse
      );
    }
  };

  useEffect(() => {
    getAllComments();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Image source={{ uri: photo }} style={styles.image} />
      </View>
      <SafeAreaView style={styles.commentsContainer}>
        <FlatList
          data={allComments}
          renderItem={({ item, index }) => (
            // <View style={styles.commentContainer}>
            //   <Text>{item.login}</Text>
            //   <Text style={styles.comment}>{item.commentText}</Text>
            //   <Text>{formatDate(item.timestamp.seconds)}</Text>
            // </View>
            <CommentItem item={item} index={index} />
          )}
          keyExtractor={(item, index) => (item.id ? item.id : index.toString())}
        />
      </SafeAreaView>

      <View style={styles.inputContainer}>
        <View style={styles.inputField}>
          <TextInput
            placeholder="Comment..."
            // ref={textInputRef}
            style={styles.input}
            value={commentText}
            placeholderTextColor={'#BDBDBD'}
            onChangeText={commentText => setCommentText(commentText)}
          />
        </View>
        <TouchableOpacity
          onPress={() => addCommentToServer()}
          style={styles.sendBtn}
        >
          <Ionicons name="arrow-up-circle" size={34} color="#FF6C00" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: '#BDBDBD',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
  },
  commentsContainer: {
    flex: 1,
  },
  commentContainer: {
    borderRadius: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    width: '100%',
    marginBottom: 24,
  },
  comment: {
    color: '#212121',
    fontSize: 13,
    fontFamily: 'Roboto-Regular',
  },
  sendBtn: {
    borderRadius: 50,
    position: 'absolute',
    top: 0,
    left: '100%',
    transform: [{ translateX: -42 }, { translateY: 8 }],
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 16,
    marginTop: 31,
  },
  input: {
    height: 50,
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 100,
    padding: 16,
    color: '#212121',
  },
  image: {
    width: '100%',
    marginTop: 32,
    marginBottom: 32,
    height: 240,
    borderRadius: 8,
  },
});
