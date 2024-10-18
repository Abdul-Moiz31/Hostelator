import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  ScrollView,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@clerk/clerk-expo';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

const featuredHostels = [
  { id: '1', name: 'Central University Hostel', university: 'Central University', price: 300, rating: 4.5, image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=1469&ixlib=rb-4.0.3' },
  { id: '2', name: 'Riverside Student Living', university: 'Riverside University', price: 350, rating: 4.7, image: 'https://images.unsplash.com/photo-1626178793926-22b28830aa30?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3' },
  { id: '3', name: 'Tech Institute Dorms', university: 'Tech Institute', price: 280, rating: 4.2, image: 'https://images.unsplash.com/photo-1573321566580-b5b0a5da3d9d?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3' },
];

const popularUniversities = [
  { id: '1', name: 'Central University', image: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&q=80&w=1374&ixlib=rb-4.0.3' },
  { id: '2', name: 'Riverside University', image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3' },
  { id: '3', name: 'Tech Institute', image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1486&ixlib=rb-4.0.3' },
  { id: '4', name: 'Arts Academy', image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3' },
];

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { isSignedIn, signOut } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const renderFeaturedHostel = ({ item }) => (
    <TouchableOpacity style={styles.hostelCard}>
      <Image source={{ uri: item.image }} style={styles.hostelImage} />
      <View style={styles.hostelInfo}>
        <Text style={styles.hostelName}>{item.name}</Text>
        <Text style={styles.hostelUniversity}>{item.university}</Text>
        <View style={styles.hostelDetails}>
          <View style={styles.priceContainer}>
            <MaterialIcons name="attach-money" size={16} color="#2ecc71" />
            <Text style={styles.priceText}>{item.price}/month</Text>
          </View>
          <View style={styles.ratingContainer}>
            <FontAwesome name="star" size={16} color="#f39c12" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderPopularUniversity = ({ item }) => (
    <TouchableOpacity style={styles.universityCard}>
      <Image source={{ uri: item.image }} style={styles.universityImage} />
      <Text style={styles.universityName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Ionicons name="school" size={32} color="#3498db" />
          <Text style={styles.headerText}>UniHostel Finder</Text>
        </View>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={24} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by university name"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.filterContainer}>
          <TouchableOpacity style={styles.filterButton}>
            <MaterialIcons name="filter-list" size={24} color="#3498db" />
            <Text style={styles.filterButtonText}>Filters</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Featured Hostels</Text>
        <FlatList
          data={featuredHostels}
          renderItem={renderFeaturedHostel}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.hostelList}
        />

        <Text style={styles.sectionTitle}>Popular Universities</Text>
        <FlatList
          data={popularUniversities}
          renderItem={renderPopularUniversity}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.universityList}
        />

        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Find Your Perfect Hostel</Text>
          <View style={styles.featureGrid}>
            <TouchableOpacity style={styles.featureItem}>
              <MaterialIcons name="attach-money" size={32} color="#2ecc71" />
              <Text style={styles.featureText}>Budget-Friendly</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.featureItem}>
              <MaterialIcons name="restaurant" size={32} color="#e74c3c" />
              <Text style={styles.featureText}>Mess Facilities</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.featureItem}>
              <MaterialIcons name="wifi" size={32} color="#3498db" />
              <Text style={styles.featureText}>Free Wi-Fi</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.featureItem}>
              <MaterialIcons name="security" size={32} color="#f39c12" />
              <Text style={styles.featureText}>24/7 Security</Text>
            </TouchableOpacity>
          </View>
        </View>

        {!isSignedIn ? (
          <View style={styles.authButtons}>
            <TouchableOpacity
              style={[styles.button, styles.signUpButton]}
              onPress={() => navigation.navigate('SignUp')}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.signInButton]}
              onPress={() => navigation.navigate('SignIn')}
            >
              <Text style={[styles.buttonText, styles.signInText]}>Sign In</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.button} onPress={() => signOut()}>
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    backgroundColor: 'white',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3498db',
    marginLeft: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    margin: 10,
    paddingHorizontal: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  filterButtonText: {
    marginLeft: 5,
    color: '#3498db',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginTop: 20,
    marginBottom: 10,
  },
  hostelList: {
    paddingLeft: 10,
  },
  hostelCard: {
    width: 280,
    backgroundColor: 'white',
    borderRadius: 10,
    marginRight: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  hostelImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  hostelInfo: {
    padding: 10,
  },
  hostelName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  hostelUniversity: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  hostelDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceText: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2ecc71',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#f39c12',
  },
  universityList: {
    paddingLeft: 10,
  },
  universityCard: {
    width: 150,
    marginRight: 15,
    alignItems: 'center',
  },
  universityImage: {
    width: 150,
    height: 100,
    borderRadius: 10,
  },
  universityName: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  featuresSection: {
    marginTop: 20,
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  featureItem: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  featureText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  authButtons: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15,
  },
  signUpButton: {
    backgroundColor: '#3498db',
  },
  signInButton: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#3498db',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signInText: {
    color: '#3498db',
  },
});