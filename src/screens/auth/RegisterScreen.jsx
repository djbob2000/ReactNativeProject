import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BackgroundImage from '../../assets/images/background/bg.jpg';
import {
  Image,
  ImageBackground,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { authStateChange } from '../../redux/auth/auth.slice';

const initStateForm = {
  login: '',
  email: '',
  password: '',
};

export const RegisterScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [registerForm, setRegisterForm] = useState(initStateForm);
  const [isAvatar, setIsAvatar] = useState(false);
  const [isVisiblePass, setIsVisiblePass] = useState(true);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const hideKeyboard = () => {
    setIsKeyboardVisible(false);
    Keyboard.dismiss();
  };

  const submitForm = () => {
    console.log('registerFormData==>', registerForm);
    hideKeyboard();
    setRegisterForm(initStateForm);
    dispatch(authStateChange(true));
  };

  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ImageBackground style={styles.bgimage} source={BackgroundImage}>
          <View
            style={{
              ...styles.container,
              marginTop: isKeyboardVisible ? 147 : 263,
            }}
          >
            <View style={styles.avatarWrapper}>
              {isAvatar && (
                <Image
                  style={styles.avatarImage}
                  source={require('../../assets/images/avatar/sample-avatar.jpg')}
                />
              )}
              <TouchableOpacity
                onPress={() => setIsAvatar(!isAvatar)}
                style={{ ...styles.btnAvatar, left: isAvatar ? 101 : 107 }}
              >
                <Image
                  style={{
                    ...styles.imgAvatar,
                    height: isAvatar ? 37 : 25,
                    width: isAvatar ? 37 : 25,
                  }}
                  source={
                    isAvatar
                      ? require('../../assets/icons/remove.png')
                      : require('../../assets/icons/add.png')
                  }
                />
              </TouchableOpacity>
            </View>
            <View style={styles.form}>
              <Text style={styles.title}>Registration</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  placeholder="Login"
                  style={styles.input}
                  value={registerForm.login}
                  onChangeText={value =>
                    setRegisterForm(prevState => ({
                      ...prevState,
                      login: value,
                    }))
                  }
                  onFocus={() => setIsKeyboardVisible(true)}
                />
              </View>
              <View style={styles.inputWrapper}>
                <TextInput
                  placeholder="E-mail"
                  style={styles.input}
                  value={registerForm.email}
                  onChangeText={value =>
                    setRegisterForm(prevState => ({
                      ...prevState,
                      email: value,
                    }))
                  }
                  onFocus={() => setIsKeyboardVisible(true)}
                />
              </View>
              <View style={styles.inputWrapper}>
                <TextInput
                  keyboardType="default"
                  placeholder="Password"
                  style={styles.input}
                  secureTextEntry={isVisiblePass}
                  value={registerForm.password}
                  onChangeText={value =>
                    setRegisterForm(prevState => ({
                      ...prevState,
                      password: value,
                    }))
                  }
                  onFocus={() => setIsKeyboardVisible(true)}
                />
                <TouchableOpacity
                  style={styles.inputBtn}
                  onPress={() => setIsVisiblePass(!isVisiblePass)}
                >
                  <Text style={{ ...styles.text, color: '#1B4371' }}>
                    {isVisiblePass ? 'Show' : 'Hide'}
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={submitForm} style={styles.submitBtn}>
                <Text style={{ ...styles.text, color: '#fff' }}>Sign up</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text
                  style={{ ...styles.text, color: '#1B4371', marginTop: 16 }}
                >
                  Already have an account? Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  avatarWrapper: {
    width: 120,
    height: 120,
    borderRadius: 16,
    top: -50,
    left: 0,
    zIndex: 99,
    backgroundColor: '#F6F6F6',
  },
  avatarImage: {
    width: 120,
    height: 120,
    borderRadius: 16,
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
  },
  btnAvatar: {
    position: 'absolute',
    bottom: 14,
    width: 25,
    height: 25,
  },
  imgAvatar: { flex: 1, resizeMode: 'cover' },
  bgimage: {
    flex: 1,
    resizeMode: 'cover',
  },

  form: {
    flex: 1,
    alignItems: 'stretch',
  },
  title: {
    marginTop: 0,
    marginBottom: 33,
    fontFamily: 'Roboto-Bold',
    fontWeight: 500,
    fontSize: 30,
    lineHeight: 35,
    textAlign: 'center',
    letterSpacing: 0.01,
    color: '#212121',
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
  },
  inputWrapper: {
    alignItems: 'stretch',
    position: 'relative',
  },
  inputBtn: {
    position: 'absolute',
    top: '50%',
    right: 16,
    backgroundColor: 'transparent',
    color: '#1B4371',
  },
  input: {
    width: '100%',
    height: 50,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 8,
    backgroundColor: '#E8E8E8',
  },
  submitBtn: {
    padding: 16,
    backgroundColor: '#FF6C00',
    color: '#fff',
    borderRadius: 100,
    marginTop: 43,
  },
});
