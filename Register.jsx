import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

export default function Register({ navigation }) {
  const gologin = () => {
    navigation.navigate('Login');
  };

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [conpassword, setconPassword] = React.useState('');

  const handleRegister = async () => {
    if (!name || !email || !password || !conpassword) {
      Alert.alert('Registration Failed', 'Please fill in all fields.');
      return;
    }

    if (password !== conpassword) {
      Alert.alert('Registration Failed', 'Passwords do not match.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Registration Failed', 'Invalid email address.');
      return;
    }

    try {
      const emailCheckResponse = await axios.get(
        `http://192.168.1.101:3000/register?email=${email}`,
      );

      const existingUser = emailCheckResponse.data.find(
        users => users.email === email,
      );
      if (existingUser) {
        Alert.alert(
          'Registration Failed',
          'An account with this email already exists.',
        );
        return;
      }

      const registerResponse = await axios.post(
        'http://192.168.1.101:3000/register/',
        {
          name: name,
          email: email,
          password: password,
        },
      );

      Alert.alert('Registration Successful');
      navigation.navigate('Login', { animationEnabled: false });
    } catch (err) {
      console.error('Error registering user:', err);
      Alert.alert(
        'Registration Failed',
        'An error occurred while registering. Please try again.',
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Image style={styles.tLogo} source={require('../assets/bglogin.png')} />

        <View style={styles.icontxt}>
          <Text style={styles.txt1}>Create an account</Text>
          <Icon name="user" size={20} color="white" style={styles.icon} />
        </View>

        <Text style={styles.slogan}>Welcome! Please enter your details.</Text>
      </View>

      <View style={styles.inputs}>
        <TextInput
          style={styles.name}
          label="Name"
          value={name}
          onChangeText={name => setName(name)}
          textColor="black"
          cursorColor="black"
          activeUnderlineColor="black"
          underlineColor="black"
          selectionColor="black"
        />

        <TextInput
          style={styles.email}
          label="Email"
          value={email}
          onChangeText={email => setEmail(email)}
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

        <TextInput
          style={styles.email}
          label="Confirm Password"
          value={conpassword}
          secureTextEntry
          right={<TextInput.Icon icon="eye" />}
          onChangeText={conpassword => setconPassword(conpassword)}
          textColor="black"
          cursorColor="black"
          activeUnderlineColor="black"
          underlineColor="black"
          selectionColor="black"
        />

        <Button
          labelStyle={{ fontSize: 20, marginTop: 18 }}
          mode="contained"
          buttonColor="black"
          onPress={handleRegister}
          style={styles.btn}>
          Sign Up
        </Button>

        <Text style={styles.ortxt}>Or sign up with</Text>

        <Button
          style={styles.google}
          icon="facebook"
          mode="outlined"
          textColor="blue"
          onPress={() => console.log('Pressed')}>
          Sign up with Facebook
        </Button>
        <Button
          style={styles.google}
          icon="google"
          mode="outlined"
          textColor="red"
          onPress={() => console.log('Pressed')}>
          Sign up with Google
        </Button>

        <Text onPress={gologin} style={styles.login}>Already have an account? Log in</Text>
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
  txt1: {
    top: -455,
    left: 10,
    color: '#ffffff',
    fontSize: 25,
    fontWeight: 'bold',
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
  icontxt: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    top: -453,
    left: 25,
  },
  slogan: {
    color: 'black',
    fontSize: 18,
    fontWeight: '500',
    top: -420,
    left: 23,
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
    height: '9%',
    justifyContent: 'center',
  },
  login: {
    marginTop: 20,
    fontSize: 16,
    color: 'black',
  },
});
