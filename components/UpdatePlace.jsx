import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import axios from 'react-native-axios';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';

const UpdatePlace = ({ route, navigation }) => {
  const { place } = route.params;
  const [title, setTitle] = useState(place.title);
  const [description, setDescription] = useState(place.description);
  const [date, setDate] = useState(place.date);
  const [imageUri, setImageUri] = useState(null);

  const selectImage = () => {
    launchImageLibrary({}, response => {
      if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  const updatePlace = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('date', date);
    if (imageUri) {
      formData.append('image', {
        uri: imageUri,
        type: 'image/jpeg', // or your image type
        name: 'image.jpg',
      });
    } else {
      formData.append('image', place.image);
    }

    try {
      await axios.put(`http://192.168.1.101:3000/place/${place.pid}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      Alert.alert('Place updated successfully!');
      // Navigate to Home screen after successful update
      navigation.navigate('Home');
    } catch (error) {
      console.error(error);
      Alert.alert('Failed to update place');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.card}>
        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />
        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          style={[styles.input, styles.description]}
        />
        <TextInput
          placeholder="Date"
          value={date}
          onChangeText={setDate}
          style={styles.input}
        />
        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'black' }]}
          onPress={selectImage}
        >
          <Icon name="image" size={20} color="white" />
          <Text style={styles.buttonText}>Select Image</Text>
        </TouchableOpacity>
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'black' }]}
          onPress={updatePlace}
        >
          <Text style={styles.buttonText}>Update Place</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    color: 'white',
  },
  description: {
    height: 100,
    textAlignVertical: 'top',
  },
  selectImageBtn: {
    marginBottom: 5,
    borderRadius: 5,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 15,
  },
  updateButton: {
    borderRadius: 5,
  },
  card: {
    height: '82%',
    backgroundColor: '#747d8c',
    borderRadius: 10,
    padding: 20,
    marginTop: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    borderRadius: 10,
    paddingVertical: 15,
    marginBottom: 5,
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 20,
    padding: 10,
    zIndex: 1,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
  },
});

export default UpdatePlace;
