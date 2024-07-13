import React, { useState } from 'react';
import { View,Text, TextInput, TouchableOpacity, Image, Alert, StyleSheet, ScrollView } from 'react-native';
import axios from 'react-native-axios';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';

const AddPlace = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [imageUri, setImageUri] = useState(null);

  const selectImage = () => {
    launchImageLibrary({}, response => {
      if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  const addPlace = async () => {
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
    }

    try {
      await axios.post('http://192.168.1.101:3000/place', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      Alert.alert("Place added successfully!");
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert("Failed to add place");
    }
  };
  
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
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
          multiline
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
        {imageUri && (
          <Image
            source={{ uri: imageUri }}
            style={styles.image}
          />
        )}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'black' }]}
          onPress={addPlace}
        >
          <Text style={styles.buttonText}>Add Place</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 40,
    paddingHorizontal: 10,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 20,
    padding: 10,
    zIndex: 1,
  },
  card: {
    height: "82%",
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
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  description: {
    height: 100,
    textAlignVertical: 'top',
  },
  image: {
    width: "100%",
    height: "35%",
    marginVertical: 15,
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
  buttonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
  },
});

export default AddPlace;
