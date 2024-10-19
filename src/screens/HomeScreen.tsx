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
  Dimensions,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@clerk/clerk-expo';
import { Ionicons, MaterialIcons, FontAwesome, Feather } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList } from '../types';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

const { width } = Dimensions.get('window');

const featuredHostels = [
  { id: '1', name: 'Central University Hostel', university: 'Central University', price: 300, rating: 4.5, image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=1469&ixlib=rb-4.0.3' },
  { id: '2', name: 'Riverside Student Living', university: 'Riverside University', price: 350, rating: 4.7, image: 'https://images.unsplash.com/photo-1626178793926-22b28830aa30?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3' },
  { id: '3', name: 'Tech Institute Dorms', university: 'Tech Institute', price: 280, rating: 4.2, image: 'https://images.unsplash.com/photo-1573321566580-b5b0a5da3d9d?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3' },
  { id: '4', name: 'Arts Academy Residence', university: 'Arts Academy', price: 320, rating: 4.6, image: 'https://images.unsplash.com/photo-1595846519845-68e298c2edd8?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3' },
  { id: '5', name: 'Seaside College Housing', university: 'Seaside College', price: 400, rating: 4.8, image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3' },
];

const popularUniversities = [
  { id: '1', name: 'Central University', image: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&q=80&w=1374&ixlib=rb-4.0.3' },
  { id: '2', name: 'Riverside University', image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3' },
  { id: '3', name: 'Tech Institute', image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1486&ixlib=rb-4.0.3' },
  { id: '4', name: 'Arts Academy', image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3' },
  { id: '5', name: 'Seaside College', image: 'https://images.unsplash.com/photo-1560440021-33f9b867899d?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3' },
];

const topRatedHostels = [
  { id: '1', name: 'Luxury Dorms', university: 'Elite University', price: 500, rating: 4.9, image: 'https://images.unsplash.com/photo-1595846519845-68e298c2edd8?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3' },
  { id: '2', name: 'Eco-Friendly Living', university: 'Green College', price: 450, rating: 4.8, image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3' },
  { id: '3', name: 'Urban Oasis', university: 'City University', price: 420, rating: 4.7, image: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3' },
];

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { isSignedIn, signOut } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const renderFeaturedHostel = ({ item }: { item: { id: string; name: string; university: string; price: number; rating: number; image: string } }) => (
    <TouchableOpacity style={styles.hostelCard} onPress={() => navigation.navigate('HostelDetails', { hostelId: item.id })}>
      <Image source={{ uri: item.image }} style={styles.hostelImage} />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.hostelGradient}
      >
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
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderPopularUniversity = ({ item }: { item: { id: string; name: string; image: string } }) => (
    <TouchableOpacity style={styles.universityCard} onPress={() => navigation.navigate('UniversityDetails', { universityId: item.id })}>
      <Image source={{ uri: item.image }} style={styles.universityImage} />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.universityGradient}
      >
        <Text style={styles.universityName}>{item.name}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderTopRatedHostel = ({ item }: { item: { id: string; name: string; university: string; price: number; rating: number; image: string } }) => (
    <TouchableOpacity style={styles.topRatedCard} onPress={() => navigation.navigate('HostelDetails', { hostelId: item.id })}>
      <Image source={{ uri: item.image }} style={styles.topRatedImage} />
      <View style={styles.topRatedInfo}>
        <Text style={styles.topRatedName}>{item.name}</Text>
        <Text style={styles.topRatedUniversity}>{item.university}</Text>
        <View style={styles.topRatedDetails}>
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=1469&ixlib=rb-4.0.3' }}
          style={styles.header}
        >
          <LinearGradient
            colors={['rgba(0,0,0,0.6)', 'transparent']}
            style={styles.headerGradient}
          >
            <View style={styles.headerContent}>
              <Ionicons name="school" size={32} color="#ffffff" />
              <Text style={styles.headerText}>Hostelator</Text>
            </View>
          </LinearGradient>
        </ImageBackground>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={24} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by university or hostel name"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.filterContainer}>
          <TouchableOpacity style={styles.filterButton}>
            <Feather name="sliders" size={24} color="#3498db" />
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

        <Text style={styles.sectionTitle}>Top Rated Hostels</Text>
        <FlatList
          data={topRatedHostels}
          renderItem={renderTopRatedHostel}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.topRatedList}
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
            <TouchableOpacity style={styles.featureItem}>
              <MaterialIcons name="local-laundry-service" size={32} color="#9b59b6" />
              <Text style={styles.featureText}>Laundry Service</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.featureItem}>
              <MaterialIcons name="fitness-center" size={32} color="#34495e" />
              <Text style={styles.featureText}>Fitness Center</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>Ready to Find Your Home Away from Home?</Text>
          <Text style={styles.ctaDescription}>Join thousands of students who have found their perfect hostel with Hostelator.</Text>
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
            <TouchableOpacity style={[styles.button, styles.signOutButton]} onPress={() => signOut()}>
              <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>
          )}
        </View>
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
  header:  {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    margin: 15,
    paddingHorizontal: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  filterButtonText: {
    marginLeft: 5,
    color: '#3498db',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginHorizontal: 15,
    marginTop: 20,
    marginBottom: 10,
  },
  hostelList: {
    paddingLeft: 15,
  },
  hostelCard: {
    width: width * 0.8,
    height: 200,
    marginRight: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  hostelImage: {
    width: '100%',
    height: '100%',
  },
  hostelGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
    justifyContent: 'flex-end',
    padding: 10,
  },
  hostelInfo: {
    justifyContent: 'flex-end',
  },
  hostelName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  hostelUniversity: {
    fontSize: 14,
    color: '#f0f0f0',
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
    paddingLeft: 15,
  },
  universityCard: {
    width: width * 0.4,
    height: 150,
    marginRight: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  universityImage: {
    width: '100%',
    height: '100%',
  },
  universityGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
    justifyContent: 'flex-end',
    padding: 10,
  },
  universityName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  topRatedList: {
    paddingLeft: 15,
  },
  topRatedCard: {
    width: width * 0.7,
    backgroundColor: 'white',
    borderRadius: 10,
    marginRight: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  topRatedImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  topRatedInfo: {
    padding: 10,
  },
  topRatedName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  topRatedUniversity: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  topRatedDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featuresSection: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureItem: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  featureText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  ctaSection: {
    backgroundColor: '#3498db',
    padding: 20,
    borderRadius: 10,
    margin: 15,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  ctaDescription: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  authButtons: {
    width: '100%',
  },
  button: {
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 10,
  },
  signUpButton: {
    backgroundColor: '#2ecc71',
  },
  signInButton: {
    backgroundColor: 'white',
  },
  signOutButton: {
    backgroundColor: '#e74c3c',
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