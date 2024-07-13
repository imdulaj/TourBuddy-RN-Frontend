import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Alert,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the Ionicons

const PlaceDetails = ({ route, navigation }) => {
  const { place } = route.params;
  const [currentPlace, setCurrentPlace] = useState(place);

  useEffect(() => {
    // Update current place when component mounts or route params change
    setCurrentPlace(place);
  }, [place]);

  const deletePlace = async (id) => {
    try {
      await axios.delete(`http://192.168.1.101:3000/place/${id}`);
      Alert.alert('Place deleted successfully!');
      navigation.goBack(); // Navigate back to the previous screen
    } catch (error) {
      console.error(error);
      Alert.alert('Failed to delete place');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          {currentPlace.image ? (
            <Image
              source={{ uri: `http://192.168.1.101:3000/images/${currentPlace.image}` }}
              style={styles.image}
              resizeMode="cover"
            />
          ) : null}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.detailsContainer}>
          <Text style={styles.title}>{currentPlace.title}</Text>
          <Text style={styles.desc}>{currentPlace.description}</Text>
          <Text style={styles.dt}>{currentPlace.date}</Text>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, { marginBottom: 10 }]}
            onPress={() => navigation.navigate('UpdatePlace', { place: currentPlace })}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => deletePlace(currentPlace.pid)}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#2d3436',
  },
  card: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    backgroundColor: '#747d8c',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 10,
    position: 'relative',
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 5,
  },
  image: {
    width: '100%',
    height: '70%',
    borderRadius: 10,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    borderRadius: 20,
    padding: 10,
  },
  detailsContainer: {
    flex: 1,
    marginBottom: 5,
    top: -150,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  button: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  desc: {
    fontSize: 20,
    marginBottom: 15,
    color: '#000',
  },
  dt: {
    fontSize: 15,
    color: '#000',
  },
});

export default PlaceDetails;
