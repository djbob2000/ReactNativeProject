import { useState } from 'react';
import BackgroundImage from '../../assets/images/background/bg.jpg';

import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const initState = {
  email: '',
  password: '',
};

export const LoginScreen = ({ navigation }) => {
  const [loginForm, setloginForm] = useState(initState);
  const [isVisiblePass, setIsVisiblePass] = useState(true);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const hideKeyboard = () => {
    setIsKeyboardVisible(false);
    Keyboard.dismiss();
  };

  const submitForm = () => {
    console.log('loginFormData==>', loginForm);
    hideKeyboard();
    setloginForm(initState);
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
              marginTop: isKeyboardVisible ? 273 : 323,
            }}
          >
            <View style={styles.form}>
              <Text style={styles.title}>Log In</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  placeholder="Email"
                  style={styles.input}
                  value={loginForm.email}
                  onChangeText={value =>
                    setloginForm(prevState => ({
                      ...prevState,
                      email: value,
                    }))
                  }
                  onFocus={() => setIsKeyboardVisible(true)}
                />
              </View>
              <View style={{ ...styles.inputWrapper }}>
                <TextInput
                  keyboardType="default"
                  placeholder="Password"
                  style={styles.input}
                  secureTextEntry={isVisiblePass}
                  value={loginForm.password}
                  onChangeText={value =>
                    setloginForm(prevState => ({
                      ...prevState,
                      password: value,
                    }))
                  }
                  onFocus={() => setIsKeyboardVisible(true)}
                />
                <TouchableOpacity
                  style={styles.showPassBtn}
                  onPress={() => setIsVisiblePass(!isVisiblePass)}
                >
                  <Text style={{ ...styles.text, color: '#1B4371' }}>
                    {isVisiblePass ? 'Show' : 'Hide'}
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={submitForm}
                style={styles.submitFormBtn}
              >
                <Text style={{ ...styles.text, color: '#fff' }}>Log in</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text
                  style={{ ...styles.text, marginTop: 16, color: '#1B4371' }}
                >
                  Don't have an account? Register
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
    backgroundColor: 'white',
    alignItems: 'center',
  },
  bgimage: {
    flex: 1,
    resizeMode: 'cover',
  },

  form: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    marginTop: 32,
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
    fontWeight: '400',
    fontSize: 16,
    textAlign: 'center',
  },
  inputWrapper: {
    alignItems: 'stretch',
    position: 'relative',
  },
  showPassBtn: {
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
    ...Platform.select({
      ios: {
        backgroundColor: '#E8E8E8',
      },
      android: {
        backgroundColor: '#E8E8E8',
      },
    }),
  },
  submitFormBtn: {
    padding: 16,
    marginTop: 43,
    backgroundColor: '#FF6C00',
    color: '#fff',
    borderRadius: 100,
  },
});
