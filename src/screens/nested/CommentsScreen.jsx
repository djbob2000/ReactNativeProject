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
import { formatDate } from '../../services/timeConvert';

export const CommentsScreen = ({ route }) => {
  const textInputRef = useRef(null);
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
      setAllComments(
        querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      );
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
      setCommentText(''); //this is not worked

      textInputRef.current.clear();

      getAllComments();
      console.log('SRABOTALO');
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
          renderItem={({ item }) => (
            <View style={styles.commentContainer}>
              <Text>{item.login}</Text>
              <Text style={styles.comment}>{item.commentText}</Text>
              <Text>{formatDate(item.timestamp.seconds)}</Text>
            </View>
          )}
          keyExtractor={(item, index) => (item.id ? item.id : index.toString())}
        />
      </SafeAreaView>
      <View style={styles.inputContainer}>
        <View style={styles.inputField}>
          <TextInput
            placeholder="Comment..."
            ref={textInputRef}
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
