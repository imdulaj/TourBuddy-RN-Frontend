import React from 'react';
import {View, Text, Image, StyleSheet, ImageBackground} from 'react-native';
import {Button} from 'react-native-paper';

export default function Welcome({navigation}) {

  const goregister = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/mainbg.jpg')}
        resizeMode="cover"
        blurRadius={2}
        style={styles.mainimage}>
        <Image style={styles.logo} source={require('../assets/logo.png')} />
        <View style={styles.btnCover}>
          <Button
            mode="contained"
            buttonColor="#000000"
            labelStyle={{fontSize: 20}}
            onPress={goregister}
            style={styles.btn}>
            Get Started
          </Button>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainimage: {
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    width: '100%',
    height: '50%',
    top: '-32%',
  },
  btn: {
    width: '90%',
    padding: 6,
    top: 150,
  },
  btnCover: {
    alignItems: 'center',
  },
});
