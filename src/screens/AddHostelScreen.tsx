import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';

type RootStackParamList = {
  ViewHostels: undefined;
};

type AddHostelScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ViewHostels'>;

type Hostel = {
  name: string;
  location: string;
  pricePerMonth: string;
  numberOfRooms: string;
  description: string;
  rules: string;
  image: string;
};

export default function AddHostelScreen() {
  const navigation = 
    useNavigation<AddHostelScreenNavigationProp>();
  const [hostel, setHostel] = useState<Hostel>({
    name: '',
    location: '',
    pricePerMonth: '',
    numberOfRooms: '',
    description: '',
    rules: '',
    image: '',
  });

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setHostel({ ...hostel, image: result.assets[0].uri });
    }
  };

  const handleAddHostel = () => {
    if (!hostel.name || !hostel.location || !hostel.pricePerMonth || !hostel.numberOfRooms || !hostel.description || !hostel.rules || !hostel.image) {
      Alert.alert('Error', 'Please fill in all fields and add an image');
      return;
    }

    // In a real app, you would send this data to your backend here
    console.log('New hostel:', hostel);

    Alert.alert('Success', 'Your hostel has been added successfully!');
    navigation.navigate('ViewHostels');
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#3498db', '#2980b9']} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add New Hostel</Text>
      </LinearGradient>

      <ScrollView style={styles.form}>
        <View style={styles.inputContainer}>
          <Ionicons name="home-outline" size={24} color="#3498db" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Hostel Name"
            value={hostel.name}
            onChangeText={(text) => setHostel({ ...hostel, name: text })}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="location-outline" size={24} color="#3498db" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Location"
            value={hostel.location}
            onChangeText={(text) => setHostel({ ...hostel, location: text })}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="cash-outline" size={24} color="#3498db" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Price per month"
            value={hostel.pricePerMonth}
            onChangeText={(text) => setHostel({ ...hostel, pricePerMonth: text })}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="bed-outline" size={24} color="#3498db" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Number of rooms"
            value={hostel.numberOfRooms}
            onChangeText={(text) => setHostel({ ...hostel, numberOfRooms: text })}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="document-text-outline" size={24} color="#3498db" style={styles.inputIcon} />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Description"
            value={hostel.description}
            onChangeText={(text) => setHostel({ ...hostel, description: text })}
            multiline
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="list-outline" size={24} color="#3498db" style={styles.inputIcon} />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Hostel Rules"
            value={hostel.rules}
            onChangeText={(text) => setHostel({ ...hostel, rules: text })}
            multiline
          />
        </View>

        <TouchableOpacity style={styles.imagePicker} onPress={handleImagePick}>
          {hostel.image ? (
            <Image source={{ uri: hostel.image }} style={styles.previewImage} />
          ) : (
            <>
              <Ionicons name="camera-outline" size={40} color="#3498db" />
              <Text style={styles.imagePickerText}>Add Hostel Photo</Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.addButton} onPress={handleAddHostel}>
          <Text style={styles.addButtonText}>Add Hostel</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  form: {
    padding: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  imagePicker: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  imagePickerText: {
    marginTop: 10,
    color: '#3498db',
    fontSize: 16,
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});