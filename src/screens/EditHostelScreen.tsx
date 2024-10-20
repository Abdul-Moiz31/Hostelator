import React, { useState, useEffect } from 'react';
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
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';

type RootStackParamList = {
  ViewHostels: undefined;
  EditHostel: { hostelId: string };
};

type EditHostelScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ViewHostels'>;
type EditHostelScreenRouteProp = RouteProp<RootStackParamList, 'EditHostel'>;

type Hostel = {
  id: string;
  name: string;
  location: string;
  pricePerMonth: string;
  numberOfRooms: string;
  description: string;
  rules: string;
  image: string;
};

export default function EditHostelScreen() {
  const navigation = useNavigation<EditHostelScreenNavigationProp>();
  const route = useRoute<EditHostelScreenRouteProp>();
  const { hostelId } = route.params;

  const [hostel, setHostel] = useState<Hostel>({
    id: hostelId,
    name: '',
    location: '',
    pricePerMonth: '',
    numberOfRooms: '',
    description: '',
    rules: '',
    image: '',
  });

  useEffect(() => {
    // In a real app, you would fetch the hostel data from your backend here
    // For this example, we'll use dummy data
    setHostel({
      id: hostelId,
      name: 'Sample Hostel',
      location: 'Sample Location',
      pricePerMonth: '500',
      numberOfRooms: '10',
      description: 'This is a sample description.',
      rules: 'These are sample rules.',
      image: 'https://example.com/sample-image.jpg',
    });
  }, [hostelId]);

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

  const handleUpdateHostel = async () => {
    if (!hostel.name || !hostel.location || !hostel.pricePerMonth || !hostel.numberOfRooms || !hostel.description || !hostel.rules || !hostel.image) {
      Alert.alert('Error', 'Please fill in all fields and add an image');
      return;
    }

    try {
      const response = await fetch(`https://your-backend-url.com/api/hostels/${hostelId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(hostel),
      });

      if (!response.ok) {
        throw new Error('Failed to update hostel');
      }

      Alert.alert('Success', 'Your hostel has been updated successfully!');
      navigation.navigate('ViewHostels');
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#3498db', '#2980b9']} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Hostel</Text>
      </LinearGradient>

      <ScrollView style={styles.form}>
        <View style={styles.inputContainer}>
          <Ionicons name="home-outline" size={24} color="#3498db" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Enter Hostel Name"
            value={hostel.name}
            onChangeText={(text) => setHostel({ ...hostel, name: text })}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="location-outline" size={24} color="#3498db" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Enter Location"
            value={hostel.location}
            onChangeText={(text) => setHostel({ ...hostel, location: text })}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="cash-outline" size={24} color="#3498db" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Enter Price per month"
            value={hostel.pricePerMonth}
            onChangeText={(text) => setHostel({ ...hostel, pricePerMonth: text })}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="bed-outline" size={24} color="#3498db" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Enter Number of Rooms"
            value={hostel.numberOfRooms}
            onChangeText={(text) => setHostel({ ...hostel, numberOfRooms: text })}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="document-text-outline" size={24} color="#3498db" style={styles.inputIcon} />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Enter Description"
            value={hostel.description}
            onChangeText={(text) => setHostel({ ...hostel, description: text })}
            multiline
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="list-outline" size={24} color="#3498db" style={styles.inputIcon} />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Enter Hostel Rules"
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
              <Text style={styles.imagePickerText}>Change Hostel Photo</Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.updateButton} onPress={handleUpdateHostel}>
          <Text style={styles.updateButtonText}>Update Hostel</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 5,
  },
  form: {
    padding: 20,
  },
  input: {
    flex: 1,
    paddingLeft: 10,
    color: '#333',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  imagePicker: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  imagePickerText: {
    color: '#3498db',
    marginTop: 10,
    fontSize: 16,
  },
  updateButton: {
    backgroundColor: '#2ecc71',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  inputIcon: {
    marginRight: 10,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    left: 10,
    top: 10,
  },
  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
  },
});
