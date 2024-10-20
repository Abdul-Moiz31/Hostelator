import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

type RootStackParamList = {
  Dashboard: undefined;
  EditHostel: { hostel: Hostel };
};

type ViewHostelsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Dashboard'>;

type Hostel = {
  id: string;
  name: string;
  location: string;
  pricePerMonth: number;
  numberOfRooms: number;
  image: string;
};

const dummyHostels: Hostel[] = [
  {
    id: '1',
    name: 'Cozy Downtown Hostel',
    location: 'New York, NY',
    pricePerMonth: 600,
    numberOfRooms: 10,
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80',
  },
  {
    id: '2',
    name: 'Beachfront Paradise',
    location: 'Miami, FL',
    pricePerMonth: 800,
    numberOfRooms: 15,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  },
];

export default function ViewHostelsScreen() {
  const navigation = useNavigation<ViewHostelsScreenNavigationProp>();
  const [hostels, setHostels] = useState<Hostel[]>([]);

  useEffect(() => {
    // In a real app, you would fetch the hostels from an API here
    setHostels(dummyHostels);
  }, []);

  const renderHostelItem = ({ item }: { item: Hostel }) => (
    <TouchableOpacity 
      style={styles.hostelItem}
      onPress={() => navigation.navigate('EditHostel', { hostel: item })}
    >
      <Image source={{ uri: item.image }} style={styles.hostelImage} />
      <View style={styles.hostelInfo}>
        <Text style={styles.hostelName}>{item.name}</Text>
        <Text style={styles.hostelLocation}>{item.location}</Text>
        <Text style={styles.hostelPrice}>${item.pricePerMonth}/month</Text>
        <Text style={styles.hostelRooms}>{item.numberOfRooms} rooms</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#3498db', '#2980b9']} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Hostels</Text>
      </LinearGradient>

      <FlatList
        data={hostels}
        renderItem={renderHostelItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.hostelList}
      />
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
  hostelList: {
    padding: 15,
  },
  hostelItem: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  hostelImage: {
    width: 100,
    height: 100,
  },
  hostelInfo: {
    flex: 1,
    padding: 10,
  },
  hostelName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  hostelLocation: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 5,
  },
  hostelPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2ecc71',
  },
  hostelRooms: {
    fontSize: 14,
    color: '#7f8c8d',
  },
});