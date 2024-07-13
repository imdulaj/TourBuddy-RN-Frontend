import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert, TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import axios from 'react-native-axios';
import { useFocusEffect } from '@react-navigation/native';
import { Button, Searchbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

const Home = ({ navigation }) => {
  const [places, setPlaces] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  const fetchPlaces = async () => {
    try {
      const response = await axios.get('http://192.168.1.101:3000/place');
      console.log('Fetched places:', response.data);
      setPlaces(response.data.places);
      setFilteredPlaces(response.data.places);
    } catch (error) {
      console.error(error);
      Alert.alert("Failed to fetch places");
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchPlaces();
    }, [])
  );

  useEffect(() => {
    setFilteredPlaces(
      places.filter(place =>
        place.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, places]);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('PlaceDetails', { place: item })}
      >
        <View style={styles.card}>
          {item.image ? (
            <Image
              source={{ uri: `http://192.168.1.101:3000/images/${item.image}` }}
              style={styles.image}
              resizeMode="cover"
            />
          ) : null}
          <View style={styles.overlay}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.search}
          inputStyle={styles.searchInput}
          placeholderTextColor="white"
          iconColor="white"
        />
        <TouchableOpacity
          style={styles.profileContainer}
          onPress={() => navigation.navigate('Profile')}
        >
          <Icon name="person-circle" size={40} color="black" />
          
        </TouchableOpacity>
      </View>
      <Button
        buttonColor='black'
        textColor="white"
        icon="plus"
        mode="contained-tonal"
        onPress={() => navigation.navigate('AddPlace')}
        style={styles.addButton}
      >
        Add Place
      </Button>
      <FlatList
        data={filteredPlaces}
        keyExtractor={(item) => item.pid.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#747d8c',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 20,
    marginTop: 10, 
  },
  search: {
    flex: 1,
    height: 40,
    backgroundColor: 'black',
    
  },
  searchInput: {
    height: '100%',
    textAlignVertical: 'center',
    color: 'white',
    marginTop: -7,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  profileText: {
    color: 'black',
    marginLeft: 5,
  },
  addButton: {
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Home;
