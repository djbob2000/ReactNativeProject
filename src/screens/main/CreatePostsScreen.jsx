import React, { useEffect, useState } from 'react';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';

import { EvilIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

const initState = {
  photo: null,
  name: '',
  region: '',
};

export const CreatePostsScreen = ({ navigation }) => {
  const [isShowKeyBoard, setIsShowKeyBoard] = useState(false);
  const [formData, setFormData] = useState(initState);
  const [camera, setCamera] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [location, setLocation] = useState(null);

  const hideKeyboard = () => {
    setIsShowKeyBoard(false);
    Keyboard.dismiss();
  };

  const isEmptyInput =
    formData.region === '' || formData.name === '' || formData.photo === null;

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePhoto = async () => {
    if (camera) {
      const { uri } = await camera.takePictureAsync();
      // Save photo to media library
      await MediaLibrary.createAssetAsync(uri);
      // Get current location
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      // Set location state
      setLocation({ photoLocation: { latitude, longitude } });

      const reverseGeocodeResult = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (reverseGeocodeResult.length > 0) {
        const [{ city, country }] = reverseGeocodeResult;

        setFormData(prevState => ({
          ...prevState,
          photo: uri,
          region: `${city}, ${country}`,
        }));
      } else {
        setFormData(prevState => ({
          ...prevState,
          photo: uri,
          region: '',
        }));
      }
    }
  };

  const submitForm = async () => {
    console.log('Submit Form DATA');
    console.log(formData);
    hideKeyboard();
    setFormData(initState);
  };

  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <ScrollView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <View
            style={{
              ...styles.container,

              alignSelf: 'center',
            }}
          >
            {formData.photo ? (
              <View
                style={{
                  height: 240,
                  marginBottom: 8,
                  borderRadius: 8,

                  backgroundColor: 'transparent',
                }}
              >
                <Image
                  style={{
                    height: 240,
                    marginBottom: 8,
                    borderRadius: 8,
                  }}
                  source={{ uri: formData.photo }}
                />
              </View>
            ) : (
              <Camera ref={setCamera} style={{ ...styles.camera }}>
                <TouchableOpacity onPress={takePhoto}>
                  <View style={styles.cameraIcon}>
                    <FontAwesome5 name="camera" size={21} color="#BDBDBD" />
                  </View>
                </TouchableOpacity>
              </Camera>
            )}
            <Text
              style={{
                color: '#BDBDBD',
                fontSize: 16,
                alignSelf: 'flex-start',
              }}
            >
              Load some picture
            </Text>
            <View style={{ ...styles.inputWrapper }}>
              <TextInput
                keyboardType="name-phone-pad"
                placeholder="Name..."
                style={styles.input}
                value={formData.name}
                onChangeText={value =>
                  setFormData(prevState => ({
                    ...prevState,
                    name: value,
                  }))
                }
                onFocus={() => setIsShowKeyBoard(true)}
              />
            </View>
            <View style={{ ...styles.inputWrapper }}>
              <TextInput
                keyboardType="name-phone-pad"
                placeholder="Location..."
                style={{ ...styles.input, paddingLeft: 24 }}
                value={formData.region}
                onChangeText={value =>
                  setFormData(prevState => ({
                    ...prevState,
                    region: value,
                  }))
                }
                onFocus={() => setIsShowKeyBoard(true)}
              />
              <TouchableOpacity
                style={styles.inputBtn}
                activeOpacity={0.7}
                onPress={() => console.log('CLIKK')}
              >
                <Text style={{ ...styles.text }}>
                  <EvilIcons name="location" size={24} color="#BDBDBD" />
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={submitForm}
              style={isEmptyInput ? styles.disabledBtn : styles.btn}
              disabled={isEmptyInput}
            >
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 18.75,
                  color: '#fff',
                }}
              >
                To publish
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 32,
  },
  camera: {
    flex: 1,

    height: 240,
    backgroundColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  cameraIcon: {
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
    padding: 22,
  },
  inputWrapper: {},
  input: {
    height: 50,
    padding: 16,
    marginTop: 16,
    borderBottomWidth: 1,
    borderColor: '#E8E8E8',
  },
  inputBtn: {
    position: 'absolute',
    top: '50%',
    left: 0,
    backgroundColor: 'transparent',
    color: '#1B4371',
  },
  btn: {
    padding: 16,
    marginTop: 43,
    backgroundColor: '#FF6C00',
    color: '#fff',
    borderRadius: 100,
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  disabledBtn: {
    padding: 16,
    marginTop: 43,
    backgroundColor: '#F6F6F6',
    color: '#BDBDBD',
    borderRadius: 100,
    alignItems: 'center',
    alignSelf: 'stretch',
  },
});
