import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile() {

  // Function to handle user logout
  const handleLogOut = async () => {
    try {
      // Remove stored email and password from AsyncStorage
      await AsyncStorage.removeItem('email');
      await AsyncStorage.removeItem('password');

      // Navigate to the 'Login' screen after successful logout
      navigation.navigate('Welcome');
      // Handle error if logout fails
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Profile</Text>
      </View>
      <View style={styles.pt1}>
        <Image
          style={styles.primg}
          source={require('../assets/profileimg.png')}
        />
        <Text style={styles.txt1}>Tour</Text>
        <Text style={styles.txt1}>tour@gmail.com</Text>
      </View>

      <View style={styles.pt2}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.inputtxt}>Change Password</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.inputtxt}>Special Notes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.inputtxt}>Privacy & Policy</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.inputtxt}>Terms & Conditions</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.pt3}>
        <Button
          labelStyle={{fontSize: 20, marginTop: 18}}
          mode="contained"
          buttonColor="black"
          onPress={handleLogOut}
          style={styles.btn}
        >
          Logout
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#747d8c'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'black',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  pt1: {
    flex: 3,
    alignItems: 'center',
  },
  pt2: {
    flex: 5,
    alignItems:'center'
  },
  pt3: {
    flex: 2,
    alignItems:'center'
  },
  primg: {
    width: '30%',
    height: '40%',
    marginTop: 25,
  },
  txt1:{
    fontWeight:'bold',
    fontSize:25,
    color:'black',
    marginTop:10
  },
  button: {
    backgroundColor: '#000000',
    padding: 25,
    width:'90%',
    marginTop:20,
    borderRadius:10
  },
  inputtxt:{
    color:'white',
    fontSize:15,
    fontWeight:'500'
  },
  btn: {
    width: '90%',
    height: '35%',
    marginTop: 60,
  },
});
