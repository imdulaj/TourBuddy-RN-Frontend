import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextInput, Button } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const checkLoggedIn = async () => {
    try {
      const storedEmail = await AsyncStorage.getItem('email');
      const storedPassword = await AsyncStorage.getItem('password');
      if (storedEmail && storedPassword) {
        navigation.navigate('BottomTabs');
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    }
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        Alert.alert('Login Failed', 'Please fill in all fields.');
        return;
      }

      const response = await axios.post('http://192.168.1.101:3000/login/', {
        email: email,
        password: password,
      });

      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('password', password);

      console.log(response.data);
      navigation.navigate('Home');
    } catch (err) {
      console.error('Error logging in:', err);
      Alert.alert(
        'Login Failed',
        'An error occurred while logging in. Please try again.',
      );
    }
  };

  const goregister = () => {
    navigation.navigate('Register');
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Image style={styles.tLogo} source={require('../assets/bglogin.png')} />

        <View style={styles.icontxt}>
          <Text style={styles.txt1}>Login</Text>
          <Icon name="user" size={20} color="#ffffff" style={styles.icon} />
        </View>

        <Text style={styles.slogan}>Welcome! Login with your details.</Text>
      </View>

      <View style={styles.inputs}>
        <TextInput
          style={styles.name}
          label="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          textColor="black"
          cursorColor="black"
          activeUnderlineColor="black"
          underlineColor="black"
          selectionColor="black"
        />

        <TextInput
          style={styles.email}
          label="Password"
          value={password}
          secureTextEntry
          right={<TextInput.Icon icon="eye" />}
          onChangeText={password => setPassword(password)}
          textColor="black"
          cursorColor="black"
          activeUnderlineColor="black"
          underlineColor="black"
          selectionColor="black"
        />

        <Button
          labelStyle={{ fontSize: 20, marginTop: 15 }}
          mode="contained"
          buttonColor="black"
          onPress={handleLogin}
          style={styles.btn}>
          Login
        </Button>

        <Text style={styles.ortxt}>Or login with</Text>

        <Button
          style={styles.google}
          icon="facebook"
          mode="outlined"
          textColor="blue"
          onPress={() => console.log('Pressed')}>
          Login with Facebook
        </Button>
        <Button
          style={styles.google}
          icon="google"
          mode="outlined"
          textColor="red"
          onPress={() => console.log('Pressed')}>
          Login with Google
        </Button>

        <Text onPress={goregister} style={styles.login}>If you don't have an account? Register</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tLogo: {
    width: '150%',
    zIndex: -1,
    top: -50,
  },
  icon: {
    top: -480,
    left: 100,
  },
  txt1: {
    top: -455,
    left: 20,
    color: '#ffffff',
    fontSize: 25,
    fontWeight: 'bold',
  },
  slogan: {
    color: 'black',
    fontSize: 18,
    fontWeight: '500',
    top: -420,
    left: 23,
  },
  inputs: {
    alignItems: 'center',
    top: -400,
  },
  name: {
    width: '90%',
    backgroundColor: '#a5b1c2',
    marginBottom: 20,
  },
  email: {
    width: '90%',
    backgroundColor: '#a5b1c2',
    marginBottom: 20,
  },
  btn: {
    width: '90%',
    height: '9%',
    marginTop: 10,
  },
  ortxt: {
    marginTop: 10,
    color: 'black',
    fontWeight: '500',
  },
  google: {
    width: '90%',
    marginTop: 10,
  },
  login: {
    fontSize: 15,
    marginTop: 180,
    color: 'black',
  },
});
