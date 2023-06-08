import React, { useEffect, useState } from 'react';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';

import { EvilIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
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
  Image,
  TouchableOpacity,
} from 'react-native';

const initState = {
  photo: null,
  titlePhoto: '',
  regionPhoto: '',
  location: '',
};

export const CreatePostsScreen = ({ navigation }) => {
  const [isShowKeyBoard, setIsShowKeyBoard] = useState(false);
  const [formData, setFormData] = useState(initState);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [location, setLocation] = useState(null);

  const hideKeyboard = () => {
    setIsShowKeyBoard(false);
    Keyboard.dismiss();
  };

  const isEmptyInput =
    formData.regionPhoto === '' ||
    formData.titlePhoto === '' ||
    formData.photo === null;

  const toggleCameraType = () => {
    setType(current =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasCameraPermission(status === 'granted');
    })();
  }, []);

  if (hasCameraPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      // Save photo to media library
      await MediaLibrary.createAssetAsync(uri);
      // Get current location
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      // Set location state
      // setLocation({ latitude, longitude });

      const reverseGeocodeResult = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (reverseGeocodeResult.length > 0) {
        const [{ city, country }] = reverseGeocodeResult;
        setFormData(prevState => ({
          ...prevState,
          photo: uri,
          regionPhoto: `${city}, ${country}`,
          location: { latitude, longitude },
        }));
      } else {
        setFormData(prevState => ({
          ...prevState,
          photo: uri,
          regionPhoto: '',
          location: { latitude, longitude },
        }));
      }
    }
  };

  const loadPhotoFromGallery = async () => {
    console.log('loadPhotoFromGalleryCLEEK====');
    let userImage = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [5, 3],
      quality: 1,
    });
    if (!userImage.canceled) {
      setFormData(prevState => ({
        ...prevState,
        photo: userImage.assets[0].uri,
      }));
    }
  };

  const submitForm = async () => {
    console.log('Submit Form DATA');
    console.log('formData=======', formData);
    hideKeyboard();
    setFormData(initState);
    navigation.navigate('HomeScreen');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={hideKeyboard}>
        <View
          style={{
            ...styles.container,
            paddingBottom: 34,
          }}
        >
          <ScrollView contentContainerStyle={styles.scroll}>
            <View style={styles.contentWrap}>
              <View>
                <View style={styles.cameraContainer}>
                  <View style={styles.cameraWrap}>
                    {formData.photo ? (
                      <View style={styles.photoWrap}>
                        <Image
                          source={{ uri: formData.photo }}
                          style={styles.photo}
                        />
                      </View>
                    ) : (
                      <Camera
                        type={type}
                        ref={setCameraRef}
                        style={styles.camera}
                      >
                        <TouchableOpacity
                          onPress={takePicture}
                          style={styles.takePhotoBtn}
                        >
                          <FontAwesome5
                            name="camera"
                            size={24}
                            color="#ffffff"
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={toggleCameraType}
                          style={styles.toggleCameraBtn}
                        >
                          <MaterialIcons
                            name="flip-camera-android"
                            size={24}
                            color="#ffffff"
                          />
                        </TouchableOpacity>
                      </Camera>
                    )}
                  </View>
                  {formData.photo ? (
                    <TouchableOpacity
                      onPress={() => {
                        setFormData(prevState => ({
                          ...prevState,
                          photo: null,
                        }));
                      }}
                    >
                      <Text
                        style={{ marginTop: 8, fontSize: 16, color: '#BDBDBD' }}
                      >
                        Remove photo
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={loadPhotoFromGallery}>
                      <Text
                        style={{
                          marginRight: 'auto',
                          marginTop: 8,
                          fontSize: 16,
                          color: '#BDBDBD',
                        }}
                      >
                        Load photo from gallery
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>

                <View style={styles.inputsContainer}>
                  <View style={styles.inputWrap}>
                    <TextInput
                      style={{ ...styles.input, marginTop: 32 }}
                      placeholder={'Name...'}
                      placeholderTextColor={'#BDBDBD'}
                      value={formData.titlePhoto}
                      onChange={({ nativeEvent: { text } }) =>
                        setFormData(prevState => ({
                          ...prevState,
                          titlePhoto: text,
                        }))
                      }
                    />
                  </View>
                  <View style={styles.inputWrap}>
                    <TextInput
                      style={{
                        ...styles.input,
                        marginTop: 16,
                        paddingLeft: 32,
                      }}
                      placeholderTextColor={'#BDBDBD'}
                      value={formData.regionPhoto}
                      onChange={({ nativeEvent: { text } }) =>
                        setFormData(prevState => ({
                          ...prevState,
                          regionPhoto: text,
                        }))
                      }
                    />
                    <View
                      style={{
                        ...styles.locationPlaceholderWrap,
                      }}
                    >
                      <Feather name="map-pin" size={24} color="#BDBDBD" />
                      <Text
                        style={{
                          ...styles.locationPlaceholderText,
                          display: formData.regionPhoto.length
                            ? 'none'
                            : 'flex',
                        }}
                      >
                        Location...
                      </Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity
                  style={{
                    ...styles.formBtn,
                    backgroundColor: isEmptyInput ? '#F6F6F6' : '#FF6C00',
                  }}
                  activeOpacity={0.7}
                  onPress={submitForm}
                >
                  <Text
                    style={{
                      ...styles.formBtnText,
                      color: isEmptyInput ? '#BDBDBD' : '#FFFFFF',
                    }}
                  >
                    Publish post
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  marginTop: 20,
                }}
              >
                <TouchableOpacity
                  style={{
                    ...styles.clearAllBtn,
                    backgroundColor: !isEmptyInput ? '#FF6C00' : '#F6F6F6',
                  }}
                  onPress={() => setFormData(initState)}
                >
                  <AntDesign
                    name="delete"
                    size={24}
                    color={!isEmptyInput ? '#FFFFFF' : '#DADADA'}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: 16,
    paddingLeft: 16,
    paddingTop: 32,
    backgroundColor: '#ffffff',
  },
  cameraContainer: {
    height: 240,
    backgroundColor: '#E8E8E8',
    borderRadius: 8,
  },
  cameraWrap: {
    height: 240,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  photoWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    borderWidth: 1,
    zIndex: 1,
    width: '100%',
  },
  photo: {
    height: 240,
    width: '100%',
  },
  camera: {
    position: 'relative',
    height: 240,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  takePhotoBtn: {
    width: 60,
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleCameraBtn: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  scroll: {
    flexGrow: 1,
  },
  contentWrap: {
    justifyContent: 'space-between',
    flex: 1,
  },
  imgWrap: {},
  imgContainer: {
    overflow: 'hidden',
    width: '100%',
    height: 240,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
  },
  img: {
    width: '100%',
    flex: 1,
    resizeMode: 'cover',
  },
  imgBtn: {
    marginTop: 8,
  },
  imgBtnText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#BDBDBD',
  },
  inputsContainer: {},
  inputWrap: {
    position: 'relative',
  },
  input: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#212121',
  },
  locationPlaceholderWrap: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -4 }],
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationPlaceholderText: {
    marginLeft: 4,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#BDBDBD',
  },
  formBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
    height: 51,
    borderRadius: 51 / 2,
  },
  formBtnText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#FFFFFF',
  },
  clearAllBtn: {
    width: 70,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    borderRadius: 20,
  },
});
